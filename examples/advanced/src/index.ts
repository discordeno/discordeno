import 'dotenv/config'

import { bot } from './bot.js'
import importDirectory from './utils/loader.js'

bot.logger.info('Starting bot...')

bot.logger.info('Loading commands...')
await importDirectory('./dist/commands')

bot.logger.info('Loading events...')
await importDirectory('./dist/events')

await bot.start()
