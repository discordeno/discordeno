import { InteractionTypes, commandOptionsParser, type EventHandlers, type Interaction } from '@discordeno/bot'
import type ItemCollector from '../collector.js'
import commands from '../commands/index.js'

export const collectors = new Set<ItemCollector<Interaction>>()

export const event: EventHandlers['interactionCreate'] = async (interaction) => {
  // Give to all the collectors the interaction to use
  for (const collector of collectors) {
    collector.collect(interaction)
  }

  // If the interaction is a command check if it is a command and run it
  if (interaction.type === InteractionTypes.ApplicationCommand) {
    if (!interaction.data) return

    const command = commands.get(interaction.data.name)
    if (!command) return

    try {
      await command.execute(interaction, commandOptionsParser(interaction))
    } catch (error) {
      console.error(error)
    }
  }
}
