import { Intents } from '@discordeno/types'
import { delay, logger } from '@discordeno/utils'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import type { EventHandlers } from '../../src/bot.js'
import { createBot } from '../../src/bot.js'
import { token } from './constants.js'
chai.use(chaiAsPromised)

describe('[Bot] Delete any guild owned guilds', () => {
  it('Start the bot', async () => {
    const bot = createBot({
      token,
      gateway: {
        token,
        events: {
          message: async (shard, data) => {
            // TRIGGER RAW EVENT
            bot.events.raw?.(data, shard.id)

            if (!data.t) return

            // RUN DISPATCH CHECK
            await bot.events.dispatchRequirements?.(data, shard.id)
            bot.events[
              data.t.toLowerCase().replace(/_([a-z])/g, function (g) {
                return g[1].toUpperCase()
              }) as keyof EventHandlers
              // @ts-expect-error as any gets removed by linter
            ]?.(data.d, shard)
          },
        },
        intents: Intents.Guilds,
      },
      events: {
        async guildCreate(payload) {
          if (payload.joinedAt && Date.now() - payload.joinedAt < 360000) {
            return
          }

          if (bot.rest.applicationId === payload.ownerId) {
            logger.debug(`Deleting one of the bot created guilds.`, payload.id)
            await bot.rest.deleteGuild(payload.id)
          }
        },
      },
    })

    await bot.start()

    await delay(5000)

    await bot.shutdown()
  })
})
