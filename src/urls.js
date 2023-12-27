const { Url } = require("../url_base.js");
const { TestAPI } = require("./views.js"); 


urls = [
    new Url({name: "test", urlPath: "/", routeHandler: TestAPI })
]

module.exports = { urls }