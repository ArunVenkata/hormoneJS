import { Url } from "../src/url_base.js";
import { TestAPI } from "./views.js"; 


export const urls = [
    new Url({name: "test", urlPath: "/", routeHandler: TestAPI }),
    new Url({name: "testapp", urlPath: "test/", app: "testapp"})  
]


/**
 * 
 * In Django’s core, INSTALLED_APPS exists to tell the framework which application packages 
 * it must register and initialize at startup. 
 * When you call django.setup(), it hands the list in your settings to the application registry 
 * (django.apps.registry.Apps), which then:
 * Iterates over each entry in INSTALLED_APPS and turns it into an AppConfig (via AppConfig.create()).
 * Imports the application’s package (or its explicit AppConfig class), 
 * then imports its models modules so that all model classes get registered.
 * Runs each app’s ready() hook and makes that app available for things 
 * like migrations, management-command discovery, template-tag loading, static-file collection,
 *  signal hookup, etc.
 */
