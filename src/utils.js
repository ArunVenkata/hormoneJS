const path = require("path");


function isInstanceOf(obj, _class){
    return obj instanceof _class
}


async function dynamicBaseImport(_path="", varName=undefined){
    let import_string = path.join(process.cwd(), _path);
    console.log(import_string);
    if(typeof varName === "string"){
        return (await import(import_string))[varName];
    }
    return await import(import_string);
}


module.exports = {
    dynamicBaseImport, isInstanceOf
}