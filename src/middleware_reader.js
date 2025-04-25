import { dynamicBaseImport, getProjectSettings } from "./utils.js";




export async function getMiddlewares() {
    // file path: src/middleware.js
    // settings file
    // Look for a file named middleware.js in the main project folder
    const { MIDDLEWARES } = await getProjectSettings();
    const middlewareList = [];
    for (let _middlewarePath of MIDDLEWARES) {
        const middlewareName = _middlewarePath;
        middlewareList.push(await dynamicBaseImport("middleware.js", middlewareName));
    }

    console.log("Middlewares found: ", middlewareList.length);

    return middlewareList;
}


export async function registerMiddlewares(express_app) {
    const middlewareList = await getMiddlewares();

    for (let _middlewareFunc of middlewareList) {
        express_app.use(_middlewareFunc)
    }
}
