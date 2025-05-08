import Config from "../internal-config-helper.js";
import chalk from "chalk";
import { DEFAULT_CLI_HELP } from "./messages.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import yargs from 'yargs';

export function getRegisteredCommands() {
  const commandFiles = [];
  const stack = [path.dirname(fileURLToPath(import.meta.url)), Config.get("baseProjectPath"),];
  const registeredCommands = new Set();
  while (stack.length > 0) {
    const _curr = stack.pop();
    const currentDir = path.join(_curr, "_commands");
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
  const { registeredCommands, commandFiles } = getRegisteredCommands();

  const _yargs = yargs(process.argv.slice(2,3)).usage(DEFAULT_CLI_HELP.replace('<commands>', Array.from(registeredCommands).join('\n'))).version();
  let argv = _yargs.argv;

  const { $0, _: unNamedArgs, ...namedArgs } = argv;
  const currentCommandName = path.basename(unNamedArgs.shift() || "", '.js');
  let isFound = false;
  for (let commandFile of commandFiles) {
    const filename = path.basename(commandFile, '.js'); // Find a better way to determine file extension, instead of hardcoding
    if (filename !== currentCommandName) {
      continue
    }
    const { default: defaultFunc } = await import(commandFile);
    isFound = true;
    if (defaultFunc === undefined){
      throw Error(`Default export not found inside '${commandFile}'!\n\nCommand exports must be default exports!\n`)
    }
    if (typeof defaultFunc == 'function') {
      await defaultFunc({unNamedArgs, namedArgs});
      break;
    }
  }
  if (!isFound) {
    if (!currentCommandName.length){
      console.log(chalk.white(`Specify a command to use hormone.`));
    }else{
      console.error(chalk.red(`\nCommand '${currentCommandName}' Not Found!`))
    }
    _yargs.showHelp("log")
  }
}
