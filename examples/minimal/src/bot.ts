import { type Bot, Collection, Intents, createBot } from '@discordeno/bot'
import { configs } from './config.js'
import type { Command } from './types/commands.js'

const rawBot = createBot({
  token: configs.token,
  intents: Intents.Guilds,
  desiredProperties: {
    interaction: {
      id: true,
      type: true,
      data: true,
      token: true,
    },
  },
})

export const bot = rawBot as BotWithCommands

// Create the command collection
bot.commands = new Collection()

export interface BotWithCommands extends Bot {
  commands: Collection<string, Command>
}
