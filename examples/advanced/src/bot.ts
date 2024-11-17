import { type Collection, Intents, LogDepth, createBot, type logger as discordenoLogger } from '@discordeno/bot'
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

// TODO: remove this type hack when dd-cache-proxy fixes support for v19
// @ts-expect-error
export const bot = createProxyCache(rawBot, {
  desiredProps: {
    guilds: ['id', 'name', 'roles'],
    roles: ['id', 'guildId', 'permissions'],
  },
  cacheInMemory: {
    guilds: true,
    roles: true,
    default: false,
  },
}) as CacheBot

export type CacheBot = typeof rawBot & {
  cache: {
    guild: {
      memory: Collection<bigint, typeof rawBot.transformers.$inferredTypes.guild>
      get: (guildId: bigint) => typeof rawBot.transformers.$inferredTypes.guild
    }
    role: {
      memory: Collection<bigint, typeof rawBot.transformers.$inferredTypes.role>
      get: (roleId: bigint) => typeof rawBot.transformers.$inferredTypes.role
    }
  }
}

// By default, bot.logger will use an instance of the logger from @discordeno/bot, this logger supports depth and we need to change it, so we need to say to TS that we know what we are doing with as
;(bot.logger as typeof discordenoLogger).setDepth(LogDepth.Full)
