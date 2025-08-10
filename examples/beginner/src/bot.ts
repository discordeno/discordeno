import { createBot, Intents } from '@discordeno/bot'
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

export const bot = createProxyCache(rawBot, {
  desiredProps: {
    guild: ['id', 'name'],
  },
  cacheInMemory: {
    guild: true,
    default: false,
  },
})
