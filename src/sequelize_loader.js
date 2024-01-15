const init = require('sequelize-cli/lib/commands/init');
const path = require("path");
const { Sequelize } = require('sequelize');
const { executeYargsCommand, dynamicBaseImport, getProjectSettings } = require("./utils");
const { getConfig } = require("./internal-config-helper")

let _sequelizeObj;

const sequelize = () => _sequelizeObj

async function initSequelize(app) {
    const settings  = await getProjectSettings();
    const sequelizeConfig = settings["SEQUELIZE_CONFIG"];
    const environment = process.env.NODE_ENV || 'development';
    _sequelizeObj = new Sequelize(sequelizeConfig[environment]);
    // executeYargsCommand(init, [''])
    return _sequelizeObj;
}


module.exports = {
    initSequelize, sequelize
}