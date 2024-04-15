const express = require('express');
const { initSequelize } = require('../../sequelize_loader');
const { registerMiddlewares } = require('../../middleware_reader');
const { registerRoutes } = require("../../url_base");

const HELP_MSG = `
Run the hormone server
`

async function runserver(_yargs, unNamedArgs, namedArgs) {
    const app = express();
    const port = _yargs.usage(HELP_MSG).options({
        "port": {
            alias: 'p',
            describe: "port number to listen on",
            type: "number",
            default: 3000
        }
    }).help().argv;
    // console.log("Express", module.)
    // console.log("LOADED FROM :", module.parent.path); // https://gist.github.com/capaj/a9ba9d313b79f1dcd9a2

    // const baseProjectPath = module.parent.path;
    // setConfig({ baseProjectPath });

    // Read settings.js from filepath present in HARMONY_SETTINGS_FILE env var
    // Register all apps TODO: Later

    // Register All Middlewares

    await registerMiddlewares(app);

    await registerRoutes({ express_app: app });

    await initSequelize(app)


    // app.use(express.json());
    // app.use(cors());
    // app.set("views", __dirname + "/views/");
    // const DB_URI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`;
    // const DB_URI = "";
    // mongoose.connect(DB_URI);

    // Add custom Response Object
    express.response.Response = function (data, status = 200) {
        return this.status(status).json(data);
    };



    app.use((req, res, next) => {
        res.Response = res.Response.bind(res);
        next();
    });




    // Provide error handling for invalid URLs
    app.use((request, response) => {
        response.status(404).json({ error: "Invalid API request" });
    });

    // listen for requests :)
    const listener = app.listen(port, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });

}

module.exports = runserver