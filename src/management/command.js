const { getConfig } = require("../internal-config-helper")
const { dynamicBaseImport } = require("../utils.js")
const { DEFAULT_CLI_HELP } = require("./messages.js")
const fs = require('fs');
const path = require('path');



async function discoverCommandFiles() {
  const _yargs = require('yargs/yargs')(process.argv.slice(2,3))
  let argv = _yargs.parse();
  // console.log("ARGV", argv);
  const { $0, _: unNamedArgs, ...namedArgs } = argv;
  // console.log("namedargs", namedArgs);
  // console.log(, "DIRNAME")
  const commandFiles = [];
  const stack = [__dirname, getConfig("baseProjectPath"), ];
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
  // console.log(registeredCommands, commandFiles);
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
    if (typeof defaultFunc == 'function') {
      await defaultFunc(require('yargs/yargs')(process.argv.slice(3)), unNamedArgs, namedArgs);
      break
    }
  }
  if(!isFound){
    _yargs.usage(DEFAULT_CLI_HELP).showHelp()
    // console.error("\x1b[31m%s\x1b[0m",`Command '${currentCommandName}' Not Found!`)
  }
}

module.exports = {
  discoverCommandFiles
}