import { setConfig } from './internal-config-helper.js';
import { discoverCommandFiles } from './management/command.js';



export async function main() {
  const baseProjectPath = process.cwd();
  setConfig({ baseProjectPath });
  discoverCommandFiles();
}

