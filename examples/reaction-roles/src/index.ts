import 'dotenv/config'

import { createBot } from '@discordeno/bot'

import commands from './commands/index.js'
import events from './events/index.js'

const token = process.env.TOKEN

if (!token) throw new Error('The TOKEN environment variable needs to be defined.')

const bot = createBot({
  token,
  events,
})

bot.transformers.desiredProperties.interaction.id = true
bot.transformers.desiredProperties.interaction.data = true
bot.transformers.desiredProperties.interaction.type = true
bot.transformers.desiredProperties.interaction.token = true

await bot.rest.upsertGuildApplicationCommands(1040334907228037121n, [...commands.values()])

await bot.start()
