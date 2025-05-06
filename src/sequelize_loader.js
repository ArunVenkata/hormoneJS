import init from 'sequelize-cli/lib/commands/init.js';
import path from "path";
import { Sequelize } from 'sequelize';
import { getProjectSettings } from "./utils.js";
import { getConfig } from "./internal-config-helper.js";

let _sequelizeObj;

export const sequelize = () => _sequelizeObj

export async function initSequelize(app) {
    const settings = await getProjectSettings();
    const sequelizeConfig = settings["SEQUELIZE_CONFIG"];
    const environment = process.env.NODE_ENV || 'development';
    _sequelizeObj = new Sequelize(sequelizeConfig[environment]);
    return _sequelizeObj;
}
