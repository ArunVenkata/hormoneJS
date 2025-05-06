import {initExpressApp} from '../../utils.js';

import yargs from 'yargs';
const HELP_MSG = `
Run the hormone server
`

export default async function runserver({ unNamedArgs, namedArgs }) {
    const yargsInstance = yargs(process.argv.slice(3))
        .usage(`Usage: runserver [options]\n${HELP_MSG}`)
        .example("runserver 5000", "Start the server on port 5000")
        .command(
            "$0 [port]",
            "Start the hormone server",
            (yargs) => {
                return yargs
                    .positional("port", {
                        describe: "Port number to listen on",
                        type: "number",
                        default: 3000,
                    })
                    .option("port", {
                        alias: 'p',
                        describe: "Port number to listen on",
                        type: "number",
                    })
            }
        )
        .help();

        
    const argv = yargsInstance.argv;
    const port = argv.port

    const app = await initExpressApp();

    const listener = app.listen(port, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });

}

