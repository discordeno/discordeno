import { Intents, createBot } from '@discordeno/bot'
import { createProxyCache } from 'dd-cache-proxy'
import { configs } from './config.js'

export const bot = createProxyCache(
  createBot({
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
  }),
  {
    desiredProps: {
      guilds: ['id', 'name'],
    },
    cacheInMemory: {
      guilds: true,
      default: false,
    },
  },
)
