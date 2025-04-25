import { getConfig } from "../internal-config-helper.js";
import chalk from "chalk";
import { DEFAULT_CLI_HELP } from "./messages.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';


export function getRegisteredCommands() {
  const commandFiles = [];
  const stack = [path.dirname(fileURLToPath(import.meta.url)), getConfig("baseProjectPath"),];
  const registeredCommands = new Set();
  while (stack.length > 0) {
    // find commands in the _commands directory
    const _curr = stack.pop();
    // console.log("CURR", _curr)
    const currentDir = path.join(_curr, "_commands");
    // console.log(currentDir, "DIRR")
    if (!fs.existsSync(currentDir)) {
      continue
    }
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        stack.push(filePath); // Add subdirectories to the stack
      } else if (path.extname(file) === '.js') {
        const commandName = path.basename(file, '.js');
        const normalizedCommandName = commandName.replace(/\s/g, ''); // Remove spaces from command name

        if (registeredCommands.has(normalizedCommandName)) {
          console.error(`Error: Command name '${commandName}' in file '${filePath}' clashes with another command.`);
        } else {
          commandFiles.push(filePath); // Add file path to the list
          registeredCommands.add(normalizedCommandName); // Add normalized command name to the set
        }
      }
    });
  }
  return { registeredCommands, commandFiles }
}


export async function discoverCommandFiles() {
  const _yargs = (await import('yargs/yargs')).default(process.argv.slice(2, 3));
  let argv = _yargs.parse();
  // console.log("ARGV", argv);
  const { $0, _: unNamedArgs, ...namedArgs } = argv;
  // console.log("namedargs", namedArgs);
  // console.log(, "DIRNAME")
  const {registeredCommands, commandFiles} = getRegisteredCommands()
  // return registeredCommands;
  // console.log("unNamedArgs", unNamedArgs)
  const currentCommandName = path.basename(unNamedArgs.shift() || "", '.js');
  let isFound = false;
  for (let commandFile of commandFiles) {
    const filename = path.basename(commandFile, '.js');
    if (filename !== currentCommandName) {
      continue
    }
    const { default: defaultFunc } = await import(commandFile);
    isFound = true;
    console.log(defaultFunc, "DEFAULT")
    if (defaultFunc === undefined){
      throw Error(`Default export not found inside '${commandFile}'!\n\nCommand exports must be default exports!\n`)
    }
    if (typeof defaultFunc == 'function') {
      const yargs = (await import('yargs/yargs')).default;
      await defaultFunc(yargs(process.argv.slice(3)), unNamedArgs, namedArgs);
      break;
    }
  }
  if (!isFound) {
    console.error(chalk.red(`\nCommand '${currentCommandName}' Not Found!`))
    _yargs.usage(DEFAULT_CLI_HELP.replace('<commands>', Array.from(registeredCommands).join('\n'))).showHelp()
  }
}
