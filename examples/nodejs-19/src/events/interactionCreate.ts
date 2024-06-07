import { InteractionTypes, commandOptionsParser } from '@discordeno/bot'
import { bot } from '../bot.js'
import { commands } from '../commands.js'

bot.events.interactionCreate = async (interaction) => {
  if (!interaction.data || interaction.type !== InteractionTypes.ApplicationCommand) return

  const command = commands.get(interaction.data.name)

  if (!command) return

  const options = commandOptionsParser(interaction)

  try {
    await command.execute(interaction, options)
  } catch (error) {
    bot.logger.error(`There was an error running the ${command.name} command.`, error)
  }
}
