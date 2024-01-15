const { dynamicBaseImport } = require("./utils");
const {APIWrapper} = require("./pre_register");
const path = require("path")
class Url{
  // given url path, get the appropriate app.
  // allowed formats: "appName"
  // find views file in given app folder and return all 
  params = {};

  constructor({name, urlPath, routeHandler}){
      this.params = { name, url: urlPath, routeHandler };
  }

  get data(){
    return this.params
  }

}

async function registerRoutes(express_app){
  const urls = await dynamicBaseImport("urls.js", "urls");
  for(let _urlConf of urls){
      const _api = _urlConf.data;
      let routeHandler = APIWrapper(_api.routeHandler);
      routeHandler = new routeHandler()
      if(routeHandler.methods.includes("GET")){
        express_app.get(_api.url, routeHandler.GET.bind(routeHandler));
        express_app.get(_api.url+`/:${_api.name}_id`, routeHandler.GET.bind(routeHandler));
      }
      if (routeHandler.methods.includes("POST")){
        express_app.post(_api.url,routeHandler.POST.bind(routeHandler));
      }
      if(routeHandler.methods.includes("DELETE")){
        express_app.delete(_api.url+`/:${_api.name}_id`, routeHandler.DELETE.bind(routeHandler))
      }
      if(routeHandler.methods.includes("PATCH")){
        express_app.patch(_api.url+`/:${_api.name}_id`, routeHandler.PATCH.bind(routeHandler))
      }
  }
}



module.exports = {
  Url, registerRoutes
}



