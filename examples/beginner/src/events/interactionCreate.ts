import { Bot } from '../../bot.ts.js'
import { InteractionTypes } from '../../deps.ts.js'
import log from '../utils/logger.ts.js'

Bot.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      log.info(`[Application Command] ${interaction.data.name} command executed.`)
      Bot.commands.get(interaction.data.name!)?.execute(Bot, interaction)
      break
  }
}
