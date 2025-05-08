import { dynamicBaseImport, getProjectSettings, trim } from "./utils.js";
import Config from "./internal-config-helper.js";
import path from "path";

class App {
    constructor(name) {

    }

    getCommands() {

    }
}




export function getAppFolderPath(baseProjectPath, dotPath) {
    const newPath = trim(dotPath, ".").replace(/\./g, "/");
    return path.join(baseProjectPath, newPath)
}

export async function getAppPaths() {
    const settings = await getProjectSettings()
    const app_dotpaths = settings.APPS
    const baseProjectPath = Config.get("baseProjectPath");

    // from app dot path, get the app path
    // if urls.js doesn't exist, it is not an app

    return app_dotpaths.map((_path) => getAppFolderPath(baseProjectPath, _path))
}
