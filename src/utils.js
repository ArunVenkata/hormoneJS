const path = require("path");
const { getConfig } = require("./internal-config-helper")

function isInstanceOf(obj, _class){
    return obj instanceof _class
}


/**
 * Function for importing things from the base project folder of library user
 * 
 * Usage:
 * - `await dynamicBaseImport("file.js")`
 * - `await dynamicBaseImport("file.js", "variableName")`
 * @param {*} _path 
 * @param {*} varName 
 * @returns 
 */
async function dynamicBaseImport(_path="", varName=undefined){
    let import_string = path.join(getConfig("baseProjectPath"), _path);     // TODO: Fix the path, make it more dynamic
    if(typeof varName === "string"){
        return (await import(import_string))[varName];
    }
    return await import(import_string);
}


function trim(str, ch) {
  var start = 0, 
      end = str.length;

  while(start < end && str[start] === ch)
      ++start;

  while(end > start && str[end - 1] === ch)
      --end;

  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}


const executeYargsCommand = async (command, args) => {
    // Get the yargs instance
    const yargs = getYArgs();
  
    // Set up the yargs instance with the provided command and arguments
    const argv = yargs.parse([command, ...args]);
  
    // Execute the command
    try {
      await argv.argv;
    } catch (error) {
      console.error('Error executing command:', error.message);
    }
  };


async function getProjectSettings() {
    const { settings, default: def } = await dynamicBaseImport("index.js");
    return (settings) ? settings : def;
}


module.exports = {
    dynamicBaseImport, isInstanceOf,
    executeYargsCommand, getProjectSettings, trim
}