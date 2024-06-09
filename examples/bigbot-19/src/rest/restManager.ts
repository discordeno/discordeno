import { createLogger, createRestManager, LogDepth } from '@discordeno/bot'
import { DISCORD_TOKEN } from '../config.js'
import { setupRestAnalyticsHooks } from '../influx.js'

if (!DISCORD_TOKEN) throw new Error('The DISCORD_TOKEN environment variable is missing')

const manager = createRestManager({
  token: DISCORD_TOKEN,
})

export const logger = createLogger({ name: 'REST' })
logger.setDepth(LogDepth.Full)

setupRestAnalyticsHooks(manager, logger)

export default manager
