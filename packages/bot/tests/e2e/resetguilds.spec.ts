import { Intents } from '@discordeno/types'
import { delay, logger, snakeToCamelCase } from '@discordeno/utils'
import { use as chaiUse } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { describe, it } from 'mocha'
import { createBot } from '../../src/bot.js'
import { token } from './constants.js'
chaiUse(chaiAsPromised)

describe('[Bot] Delete any guild owned guilds', () => {
  it('Start the bot', async () => {
    const bot = createBot({
      token,
      desiredProperties: {
        guild: {
          id: true,
          joinedAt: true,
          ownerId: true,
        },
      },
      gateway: {
        token,
        events: {
          message: async (shard, data) => {
            // TRIGGER RAW EVENT
            bot.events.raw?.(data, shard.id)

            if (!data.t) return

            // RUN DISPATCH CHECK
            await bot.events.dispatchRequirements?.(data, shard.id)

            const eventName = snakeToCamelCase(data.t)
            bot.events[eventName as keyof typeof bot.events]?.(data.d as never, shard as never)
          },
        },
        intents: Intents.Guilds,
      },
      events: {
        async guildCreate(guild) {
          if (guild.joinedAt && Date.now() - guild.joinedAt < 360000) {
            return
          }

          if (bot.rest.applicationId === guild.ownerId) {
            logger.debug(`Deleting one of the bot created guilds.`, guild.id)
            await bot.rest.deleteGuild(guild.id)
          }
        },
      },
    })

    await bot.start()

    await delay(5000)

    await bot.shutdown()
  })
})
