const { dynamicBaseImport } = require("./utils");
const { APIWrapper } = require("./pre_register");
const { getConfig } = require("./internal-config-helper")
const { getAppFolderPath } = require("./apps-helper")
const path = require("path")

class Url {
  // given url path, get the appropriate app.
  // allowed formats: "appName"
  // find views file in given app folder and return all 
  params = {};
  app = null;

  constructor({ name, urlPath, routeHandler, app }) {
    if(routeHandler && app){
      throw Error(`Error in URL '${name}': Must specify only ONE of routeHandler or app`)
    }
    this.appDotPath = app
    if(app){
      this.app = app
    }
    this.params = { name, url: urlPath, routeHandler };
  }

  get data() {
    return this.params
  }

  // getAppUrls(){
  //   if(!this.app){
  //     throw Error(`Error in URL '${this.params.name}': No App Found`)
  //   }
  //   return this.app.getAppUrls()
  // }
}

async function registerRoutes({express_app, app_path="", urlPrefix=""}) {
  const urls = await dynamicBaseImport(path.join(app_path, "urls.js"), "urls");

  for (let _urlConf of urls) {
    const _api = _urlConf.data;
    if(_urlConf.app){
      console.log(_urlConf.app)
      console.log(getAppFolderPath(getConfig('baseProjectPath'),_urlConf.app))
      await registerRoutes({express_app, app_path: getAppFolderPath("", _urlConf.app), urlPrefix: _api.name})
      continue
    }
    let routeHandler = APIWrapper(_api.routeHandler);
    routeHandler = new routeHandler()
    // if url has app, call registerroutes function with app_path set to appname from app and urlPrefix set to url.name
    if (routeHandler.methods.includes("GET")) {
      // console.log(`REGISTERED GET ${path.join(urlPrefix, _api.url)}`);
      // console.log(`REGISTERED GET ${path.join(urlPrefix, _api.url)}:${_api.name}_id`);
      express_app.get(path.join(urlPrefix, _api.url), routeHandler.GET.bind(routeHandler));
      express_app.get(path.join(urlPrefix, _api.url) + `/:${_api.name}_id`, routeHandler.GET.bind(routeHandler));
    }
    if (routeHandler.methods.includes("POST")) {
      // console.log(`REGISTERED POST ${path.join(urlPrefix, _api.url)}`);
      express_app.post(path.join(urlPrefix, _api.url), routeHandler.POST.bind(routeHandler));
    }
    if (routeHandler.methods.includes("DELETE")) {
      // console.log(`REGISTERED DELETE ${path.join(urlPrefix, _api.url)}`);
      express_app.delete(path.join(urlPrefix, _api.url) + `/:${_api.name}_id`, routeHandler.DELETE.bind(routeHandler));
    }
    if (routeHandler.methods.includes("PATCH")){
      // console.log(`REGISTERED PATCH ${path.join(urlPrefix, _api.url)}`);
      express_app.patch(path.join(urlPrefix, _api.url) + `/:${_api.name}_id`, routeHandler.PATCH.bind(routeHandler));
    }
  }
}

module.exports = {
  Url, registerRoutes
}



