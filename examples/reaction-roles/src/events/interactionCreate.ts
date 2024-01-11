import { InteractionTypes, commandOptionsParser, type EventHandlers } from '@discordeno/bot'
import commands from '../commands/index.js'

export const event: EventHandlers['interactionCreate'] = async (interaction) => {
  if (interaction.type === InteractionTypes.ApplicationCommand) {
    if (!interaction.data) return

    const command = commands.get(interaction.data.name)
    if (!command) return

    await command.execute(interaction, commandOptionsParser(interaction))
  }
}
