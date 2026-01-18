import 'dotenv/config';

import { join as joinPath } from 'node:path';
import { getDirnameFromFileUrl } from '../util.js';
import { bot } from './bot.js';
import importDirectory from './utils/loader.js';
import { updateCommands } from './utils/updateCommands.js';

// The importDirectory function uses 'readdir' that requires either a relative path compared to the process CWD or an absolute one, so to get one relative we need to use import.meta.url
const currentDirectory = getDirnameFromFileUrl(import.meta.url);

await importDirectory(joinPath(currentDirectory, './commands'));

await updateCommands();

bot.logger.info('Done!');

// We need to manually exit as the REST Manager has timeouts that will keep NodeJS alive
process.exit();
