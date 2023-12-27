const { dynamicBaseImport } = require("./utils.js");




async function getProjectSettings(){
    const {settings} = await dynamicBaseImport("index.js");
    return settings;
}


async function getMiddlewares(){
    // file path: src/middleware.js
    // settings file
    const { MIDDLEWARES } = await getProjectSettings();
    const middlewareList = [];

    for(let _middlewarePath of MIDDLEWARES){
        const middlewareName = _middlewarePath;
        middlewareList.push(await dynamicBaseImport("middleware.js", middlewareName));
    }

    console.log("Middlewares found: ", middlewareList.length);

    return middlewareList;
}


async function registerMiddlewares(express_app){
    const middlewareList =  await getMiddlewares();

    for(let _middlewareFunc of middlewareList){
        express_app.use(_middlewareFunc)
    }
}

module.exports = {
    registerMiddlewares,
    getProjectSettings
}