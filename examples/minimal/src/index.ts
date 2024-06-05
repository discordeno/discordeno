import 'dotenv/config'

import { bot } from './bot.js'
import { updateCommands } from './utils/helpers.js'
import importDirectory from './utils/loader.js'
import logger from './utils/logger.js'

logger.info('Starting bot...')

logger.info('Loading commands...')
await importDirectory('./dist/commands')

logger.info('Loading events...')
await importDirectory('./dist/events')

logger.info('Updating commands...')
await updateCommands()

await bot.start()
