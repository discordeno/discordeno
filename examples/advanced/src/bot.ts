import { createBot, type logger as discordenoLogger, Intents, LogDepth } from '@discordeno/bot'
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
      token: true,
      guildId: true,
      member: true,
    },
    guild: {
      id: true,
      name: true,
      roles: true,
      ownerId: true,
    },
    role: {
      id: true,
      guildId: true,
      permissions: true,
    },
    member: {
      id: true,
      roles: true,
    },
    channel: {
      id: true,
    },
    user: {
      id: true,
      username: true,
      discriminator: true,
    },
  },
})

export const bot = createProxyCache(rawBot, {
  desiredProps: {
    guild: ['id', 'name', 'ownerId', 'roles'],
    roles: ['id', 'guildId', 'permissions'],
  },
  cacheInMemory: {
    guild: true,
    role: true,
    default: false,
  },
})

// By default, bot.logger will use an instance of the logger from @discordeno/bot, this logger supports depth and we need to change it, so we need to say to TS that we know what we are doing with as
;(bot.logger as typeof discordenoLogger).setDepth(LogDepth.Full)
