import { InteractionTypes, commandOptionsParser } from '@discordeno/bot'
import { bot } from '../../bot.js'

bot.events.interactionCreate = async (interaction) => {
  const isCommandOrAutocomplete =
    interaction.type === InteractionTypes.ApplicationCommand || interaction.type === InteractionTypes.ApplicationCommandAutocomplete

  if (!interaction.data || !isCommandOrAutocomplete) return

  const command = bot.commands.get(interaction.data.name)

  if (!command) {
    // TODO: the command was not found
    return
  }

  // TODO: log the command was triggered

  const options = commandOptionsParser(interaction)

  try {
    await command.run(interaction, options)
    // TODO: log command success
  } catch (error) {
    // TODO: (complete) log command failure
    bot.logger.error(error)
  }
}
