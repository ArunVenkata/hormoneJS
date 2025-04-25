import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { getTemplateFilePath } from "../../utils.js";
import { getConfig } from "../../internal-config-helper.js";

const HELP_MSG = `
Create a new command file
`;

// Create a file called newcmd.js
function createNewCommandFile(fileName) {
    fileName = path.basename(fileName);
    const cmdDir = path.join(getConfig("baseProjectPath"), "_commands");
    if (fs.existsSync(path.join(cmdDir, `${fileName}`))) {
        console.error(chalk.red(`Command Error: ${fileName} already exists.`))
        return;
    }
    if (!fs.existsSync(cmdDir)) {
        fs.mkdirSync(cmdDir);
    }
    const newFilePath = path.join(cmdDir, `${fileName}`)
    fs.copyFile(getTemplateFilePath(`newcmd.js`), newFilePath, (err) => {
        if (err) throw err;
        console.log(`Command File Created. Path: ${newFilePath}`);
    });
}


export default async function newcmd(_yargs, unNamedArgs, namedArgs) {
    const parsedArgs = _yargs.usage(HELP_MSG).help(false).version(false).positional('fname', {
        describe: 'File name of new command file',
        type: 'string',
    }).option('fname', {
        alias: "--f",
        describe: 'File name of new command file',
        type: 'string',
    }).parse()

    const fileName = parsedArgs._[0] || parsedArgs.fname
    if (!fileName) {
        console.error('Error: You need to specify the file name');
        _yargs.showHelp()
        process.exit(1);
    }

    const fileNameWithExt = fileName.endsWith('.js') ? fileName : `${fileName}.js`;
    createNewCommandFile(fileNameWithExt);

}
