const { dynamicBaseImport, getProjectSettings, trim } = require("./utils");
const { getConfig } = require("./internal-config-helper")
const path = require("path");


const fs = require("fs")

class App{
    constructor(name){
        
    }
    
    getAllApps(){
        // Get apps from project settings
    }

    getCommands(){
        
    }
}




function getAppFolderPath(baseProjectPath, dotPath){

    
    const newPath = trim(dotPath, ".").replace(/\./g,"/");
    return path.join(baseProjectPath, newPath)
}

async function getAppPaths(){
    const settings = await getProjectSettings()
    const app_dotpaths = settings.APPS
    const baseProjectPath = getConfig("baseProjectPath");
    
    // from app dot path, get the app path
    // if urls.js doesn't exist, it is not an app
    // 
    console.log("APPS", app_dotpaths);
    console.log(getConfig("baseProjectPath"));

    return app_dotpaths.map((_path) => getAppFolderPath(baseProjectPath, _path))
}


module.exports = {
    getAppPaths, getAppFolderPath
}
