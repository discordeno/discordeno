import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'

import events from './events/index.js'

config()
const token = process.env.TOKEN

// Ensure the existence of the TOKEN env
if (!token) throw new Error('The TOKEN environment variable needs to be defined.')

export const bot = createBot({
  token,
  events,
})

// Setup for the desiredProperties

bot.transformers.desiredProperties.user.id = true

bot.transformers.desiredProperties.message.id = true

bot.transformers.desiredProperties.member.roles = true

bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.user = true
bot.transformers.desiredProperties.interaction.token = true
bot.transformers.desiredProperties.interaction.member = true
bot.transformers.desiredProperties.interaction.message = true
bot.transformers.desiredProperties.interaction.guildId = true
bot.transformers.desiredProperties.interaction.channelId = true

bot.transformers.desiredProperties.role.id = true

await bot.start()

process.on('unhandledRejection', bot.logger.error)
