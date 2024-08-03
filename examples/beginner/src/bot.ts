import { Intents, createBot } from '@discordeno/bot'
import { createProxyCache } from 'dd-cache-proxy'
import { configs } from './config.js'

export const bot = createProxyCache(
  createBot({
    token: configs.token,
    intents: Intents.Guilds,
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

// Setup desired properties
bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.user = true
bot.transformers.desiredProperties.interaction.token = true
bot.transformers.desiredProperties.interaction.guildId = true

bot.transformers.desiredProperties.guild.id = true
bot.transformers.desiredProperties.guild.name = true

bot.transformers.desiredProperties.user.username = true
