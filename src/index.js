const express = require('express');
const { registerMiddlewares } = require('./middleware_reader'); 
const { registerRoutes }  = require("./url_base");

// const {APIS, defaultRoute} = require("./apis.js")

async function run(){
  const app = express();



  // Read settings.js from filepath present in HARMONY_SETTINGS_FILE env var
  // Register all apps TODO: Later
  
  // Register All Middlewares
  
  await registerMiddlewares(app);
  
  await registerRoutes(app);
  
  
  // app.use(express.json());
  // app.use(cors());
  // app.set("views", __dirname + "/views/");
  // const DB_URI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`;
  // const DB_URI = "";
  // mongoose.connect(DB_URI);
  
  // Add custom Response Object
  express.response.Response = function (data, status=200) {
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
  const listener = app.listen(3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
  });
  
}

module.exports ={
  run
}
