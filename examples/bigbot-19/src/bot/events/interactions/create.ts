import { InteractionTypes, commandOptionsParser } from '@discordeno/bot'
import { bot } from '../../bot.js'
import { loadLocale } from '../../languages/translate.js'

bot.events.interactionCreate = async (interaction) => {
  const isCommandOrAutocomplete =
    interaction.type === InteractionTypes.ApplicationCommand || interaction.type === InteractionTypes.ApplicationCommandAutocomplete

  if (!interaction.data || !isCommandOrAutocomplete) return

  if (interaction.guildId) {
    await loadLocale(interaction.guildId)
  }

  const command = bot.commands.get(interaction.data.name)

  if (!command) {
    // TODO: the command was not found
    return
  }

  // TODO: log the command was triggered
  // TODO: handle autocomplete

  const options = commandOptionsParser(interaction)

  try {
    await command.run(interaction, options)
    // TODO: log command success
  } catch (error) {
    // TODO: (complete) log command failure
    bot.logger.error(error)
  }
}
