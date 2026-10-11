import { dynamicBaseImport } from "./utils.js";
import { APIWrapper } from "./pre_register.js";
import { getAppFolderPath } from "./apps-helper.js";
import path from "path";

const INCLUDE_TYPE = Symbol("include");

function normalizeRouteName(route = "") {
  const cleaned = route.replace(/\/+$/g, "").replace(/^\/+/g, "");
  return cleaned.replace(/\//g, "_") || "root";
}

function getRouteName({ name, urlPath, routeHandler, app }) {
  if (name) {
    return name;
  }
  if (typeof app === "string") {
    return app.split(".").pop();
  }
  if (routeHandler?.name) {
    return routeHandler.name;
  }
  return normalizeRouteName(urlPath);
}

export class Url {
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

export function include(app) {
  if (typeof app !== "string" || !app.trim()) {
    throw new Error("include() expects the app dot path as a non-empty string");
  }
  return { [INCLUDE_TYPE]: true, app };
}

export function pathRoute(urlPath, routeHandlerOrInclude, name = undefined) {
  if (routeHandlerOrInclude?.[INCLUDE_TYPE]) {
    const app = routeHandlerOrInclude.app;
    return new Url({
      name: getRouteName({ name, urlPath, app }),
      urlPath,
      app,
    });
  }
  return new Url({
    name: getRouteName({ name, urlPath, routeHandler: routeHandlerOrInclude }),
    urlPath,
    routeHandler: routeHandlerOrInclude,
  });
}

export { pathRoute as path };

export async function registerRoutes({express_app, app_path="", urlPrefix=""}) {
  const urls = await dynamicBaseImport(path.join(app_path, "urls.js"), "urls");

  for (let _urlConf of urls) {
    const _api = _urlConf.data;
    if(_urlConf.app){
      await registerRoutes({express_app, app_path: getAppFolderPath("", _urlConf.app), urlPrefix: _api.name})
      continue
    }
    let routeHandler = APIWrapper(_api.routeHandler);
    routeHandler = new routeHandler()
    // if url has app, call registerroutes function with app_path set to appname from app and urlPrefix set to url.name
    if (routeHandler.methods.includes("GET")) {
      express_app.get(path.join(urlPrefix, _api.url), routeHandler.GET.bind(routeHandler));
      express_app.get(path.join(urlPrefix, _api.url) + `/:${_api.name}_id`, routeHandler.GET.bind(routeHandler));
    }
    if (routeHandler.methods.includes("POST")) {
      express_app.post(path.join(urlPrefix, _api.url), routeHandler.POST.bind(routeHandler));
    }
    if (routeHandler.methods.includes("DELETE")) {
      express_app.delete(path.join(urlPrefix, _api.url) + `/:${_api.name}_id`, routeHandler.DELETE.bind(routeHandler));
    }
    if (routeHandler.methods.includes("PATCH")){
      express_app.patch(path.join(urlPrefix, _api.url) + `/:${_api.name}_id`, routeHandler.PATCH.bind(routeHandler));
    }
  }
}

