const { Url } = require("../../src/url_base.js");
const { TestAPITestApp } = require("./views.js"); 


urls = [
    new Url({name: "test", urlPath: "/", routeHandler: TestAPITestApp })
]

module.exports = { urls }