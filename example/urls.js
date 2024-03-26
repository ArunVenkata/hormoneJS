const { Url } = require("../src/url_base.js");
const { TestAPI } = require("./views.js"); 


urls = [
    new Url({name: "test", urlPath: "/", routeHandler: TestAPI }),
    // new Url({name: "testapp", urlPath: "test/", app: "testapp"})  // Figure out why apps Need to be included in the apps list in django
]

module.exports = { urls }