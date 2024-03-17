import { createBot } from '@discordeno/bot'
import { config } from 'dotenv'

import commands from './commands/index.js'
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

const guildId = 'REPLACE WITH YOUR GUILD ID'

// `upsertGuildApplicationCommands` is a promise, but if we await and we got ratelimited from the discord endpoint it can force the code to wait for the ratelimit end
// NOTE: This will cause ratelimit, especially in development where you may restart your bot a lot, you might want to either:
//  - Move the updating of commands in a separate file
//  - Conditionally call based on the exiting commands, this does require some work to save the the previous state of commands
bot.rest
  .upsertGuildApplicationCommands(guildId, [...commands.values()])
  .catch((e) => bot.logger.error('There was an error when updating the global commands', e))

await bot.start()

process.on('unhandledRejection', bot.logger.error)
