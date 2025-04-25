import { Url } from "../../src/url_base.js";
import { TestAPITestApp } from "./views.js";


export const urls = [
    new Url({name: "test", urlPath: "/", routeHandler: TestAPITestApp })
]
