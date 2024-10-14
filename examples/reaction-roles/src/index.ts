import { bot } from './bot.js'

await bot.start()

process.on('unhandledRejection', bot.logger.error)
