import { createBot, Intents, LogDepth, type logger as discordenoLogger } from '@discordeno/bot'
import { createProxyCache } from 'dd-cache-proxy'
import { configs } from './config.js'

export const bot = createProxyCache(
  createBot({
    token: configs.token,
    intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
  }),
  {
    desiredProps: {
      guilds: ['id', 'name', 'roles'],
      roles: ['id', 'permissions'],
    },
    cacheInMemory: {
      guilds: true,
      roles: true,
      default: false,
    },
  },
)

// By default, bot.logger will use an instance of the logger from @discordeno/bot, this logger supports depth and we need to change it, so we need to say to TS that we know what we are doing with as
;(bot.logger as typeof discordenoLogger).setDepth(LogDepth.Full)

// Setup desired proprieties
bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.token = true
bot.transformers.desiredProperties.interaction.guildId = true
bot.transformers.desiredProperties.interaction.member = true

bot.transformers.desiredProperties.guild.id = true
bot.transformers.desiredProperties.guild.name = true

bot.transformers.desiredProperties.role.id = true
bot.transformers.desiredProperties.role.permissions = true

bot.transformers.desiredProperties.member.id = true
bot.transformers.desiredProperties.member.roles = true

bot.transformers.desiredProperties.user.id = true
bot.transformers.desiredProperties.user.username = true
bot.transformers.desiredProperties.user.discriminator = true
