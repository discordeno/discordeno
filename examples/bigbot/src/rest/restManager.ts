import { createLogger, createRestManager } from '@discordeno/bot'
import { DISCORD_TOKEN } from '../config.js'
import { setupRestAnalyticsHooks } from './influx.js'

const manager = createRestManager({
  token: DISCORD_TOKEN,
})

export const logger = createLogger({ name: 'REST' })

setupRestAnalyticsHooks(manager, logger)

export default manager
