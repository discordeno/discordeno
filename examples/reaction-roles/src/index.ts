import 'dotenv/config'

import { createBot } from '@discordeno/bot'

import commands from './commands/index.js'
import events from './events/index.js'

const token = process.env.TOKEN

// Ensure the existance of the TOKEN env
if (!token) throw new Error('The TOKEN environment variable needs to be defined.')

export const bot = createBot({
  token,
  events,
})

// Setup for the desiredProperties

bot.transformers.desiredProperties.message.id = true

bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.token = true
bot.transformers.desiredProperties.interaction.message = true
bot.transformers.desiredProperties.interaction.channelId = true

bot.transformers.desiredProperties.role.id = true
bot.transformers.desiredProperties.role.name = true

// `upsertGlobalApplicationCommands` is a promise, but awaiting it can cause issues if you are ratelimit from the endpoint
bot.rest
  .upsertGlobalApplicationCommands([...commands.values()])
  .catch((e) => bot.logger.error('There was an error when updating the global commands', e))

await bot.start()

process.on('unhandledRejection', bot.logger.error)
