const express = require('express');

const { registerRoutes }  = require("./url_base");
const { setConfig } = require("./internal-config-helper")
// const {APIS, defaultRoute} = require("./apis.js")
const { getAppPaths } = require("./apps-helper");
const { discoverCommandFiles } = require("./management/command")
async function test(){
  const baseProjectPath = module.parent.path
  setConfig({baseProjectPath})
  const app = express();
  await registerRoutes({express_app: app });
  discoverCommandFiles();
}



module.exports ={
  test
}
