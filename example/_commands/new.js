
const HELP_MSG = `
<help message goes here>
`;

export default async function MyCommand(_yargs, unNamedArgs, namedArgs) {

    const parsedArgs = _yargs.usage(HELP_MSG).help().parse()

    console.log("NEW Args", parsedArgs)

}