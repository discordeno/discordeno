import 'dotenv/config';

import { bot } from './bot.js';
import { updateCommands } from './utils/helpers.js';
import importDirectory from './utils/loader.js';

bot.logger.info('Loading commands...');
await importDirectory('./dist/commands');

bot.logger.info('Updating commands...');
await updateCommands();

bot.logger.info('Done!');

// We need to manually exit as the REST Manager has timeouts that will keep NodeJS alive
process.exit();
