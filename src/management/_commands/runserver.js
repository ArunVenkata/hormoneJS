import express from 'express';
import { initSequelize } from '../../sequelize_loader.js';
import { registerMiddlewares } from '../../middleware_reader.js';
import { registerRoutes } from "../../url_base.js";

const HELP_MSG = `
Run the hormone server
`

export default async function runserver(_yargs, unNamedArgs, namedArgs) {
    const port = _yargs.usage(HELP_MSG).options({
        "port": {
            alias: 'p',
            describe: "port number to listen on",
            type: "number",
            default: 3000
        }
    }).help().argv;
    
    console.log("LOADED FROM :", process.cwd());
    
    const app = express();

    await registerMiddlewares(app);

    await registerRoutes({ express_app: app });

    await initSequelize(app)

    express.response.Response = function (data, status = 200) {
        return this.status(status).json(data);
    };

    app.use((req, res, next) => {
        res.Response = res.Response.bind(res);
        next();
    });
    
    app.use((request, response) => {
        response.status(404).json({ error: "Invalid API request" });
    });

    const listener = app.listen(port, function () {
        console.log('Your app is listening on port ' + listener.address().port);
    });

}

