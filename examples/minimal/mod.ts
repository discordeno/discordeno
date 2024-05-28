import { BOT_ID, BOT_TOKEN } from './configs.ts.js'
import { ActivityTypes, GatewayIntents, createBot, enableCachePlugin, enableCacheSweepers, fastFileLoader, startBot } from './deps.ts.js'
import { events } from './src/events/mod.ts.js'
import { updateCommands } from './src/utils/helpers.ts.js'
import { logger } from './src/utils/logger.ts.js'

const log = logger({ name: 'Main' })

log.info('Starting Bot, this might take a while...')

const paths = ['./src/events', './src/commands']
await fastFileLoader(paths).catch((err) => {
  log.fatal(`Unable to Import ${paths}`)
  log.fatal(err)
  Deno.exit(1)
})

export const bot = enableCachePlugin(
  createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    intents: GatewayIntents.Guilds,
    events,
  }),
)

// @ts-nocheck: no-updated-depencdencies
enableCacheSweepers(bot)

bot.gateway.manager.createShardOptions.makePresence = (shardId: number) => {
  return {
    shardId,
    status: 'online',
    activities: [
      {
        name: 'Discordeno is the Best Lib',
        type: ActivityTypes.Game,
        createdAt: Date.now(),
      },
    ],
  }
}

await startBot(bot)

await updateCommands(bot)
