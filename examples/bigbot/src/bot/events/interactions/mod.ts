import { InteractionTypes, MessageComponentTypes } from 'discordeno'
import { bot } from '../../bot.js'
import type { InteractionWithCustomProps } from '../../typings/discordeno.js'
import { executeButtonClick } from './button.js'
import { executeSlashCommand } from './command.js'
import { executeModalSubmit } from './modal.js'

export function setInteractionCreateEvent(): void {
  bot.events.interactionCreate = async function (_, interaction) {
    if (interaction.type === InteractionTypes.ApplicationCommand) {
      await executeSlashCommand(bot, interaction as InteractionWithCustomProps)
    } else if (interaction.type === InteractionTypes.MessageComponent) {
      if (!interaction.data) return

      // THE INTERACTION CAME FROM A BUTTON
      if (interaction.data.componentType === MessageComponentTypes.Button) {
        await executeButtonClick(bot, interaction)
      }
    } else if (interaction.type === InteractionTypes.ModalSubmit) {
      await executeModalSubmit(bot, interaction)
    }
  }
}
