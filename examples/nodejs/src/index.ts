import 'dotenv/config'

import { bot } from './bot.js'
import importDirectory from './utils/loader.js'
import { updateApplicationCommands } from './utils/updateCommands.js'

bot.logger.info('Starting bot...')

bot.logger.info('Loading commands...')
await importDirectory('./dist/commands')

bot.logger.info('Loading events...')
await importDirectory('./dist/events')

bot.logger.info('Updating commands...')
await updateApplicationCommands()

await bot.start()
