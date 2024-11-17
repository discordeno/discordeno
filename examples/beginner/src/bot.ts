import { type Collection, Intents, createBot } from '@discordeno/bot'
import { createProxyCache } from 'dd-cache-proxy'
import { configs } from './config.js'

const rawBot = createBot({
  token: configs.token,
  intents: Intents.Guilds,
  desiredProperties: {
    interaction: {
      id: true,
      type: true,
      data: true,
      user: true,
      token: true,
      guildId: true,
    },
    guild: {
      id: true,
      name: true,
    },
    user: {
      username: true,
    },
  },
})

// TODO: remove this type hack when dd-cache-proxy fixes support for v19
// @ts-expect-error
export const bot = createProxyCache(rawBot, {
  desiredProps: {
    guilds: ['id', 'name'],
  },
  cacheInMemory: {
    guilds: true,
    default: false,
  },
}) as CacheBot

export type CacheBot = typeof rawBot & {
  cache: {
    guild: {
      memory: Collection<bigint, typeof rawBot.transformers.$inferredTypes.guild>
      get: (guildId: bigint) => typeof rawBot.transformers.$inferredTypes.guild
    }
  }
}
