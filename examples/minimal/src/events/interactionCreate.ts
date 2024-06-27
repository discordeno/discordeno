import { InteractionTypes } from '@discordeno/bot'
import { bot } from '../bot.js'
import logger from '../utils/logger.js'

bot.events.interactionCreate = (interaction) => {
  if (!interaction.data) return

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      logger.info(`[Application Command] ${interaction.data.name} command executed.`)

      bot.commands.get(interaction.data.name)?.execute(interaction)
      break
  }
}
