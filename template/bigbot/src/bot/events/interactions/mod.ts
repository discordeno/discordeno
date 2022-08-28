import { InteractionTypes, MessageComponentTypes } from "discordeno";
import { bot } from "../../bot";
import { executeButtonClick } from "./button";
import { executeSlashCommand } from "./command";
import { executeModalSubmit } from "./modal";

export function setInteractionCreateEvent() {
  bot.events.interactionCreate = async function (_, interaction) {
    if (interaction.type === InteractionTypes.ApplicationCommand) {
      await executeSlashCommand(bot, interaction);
    } else if (interaction.type === InteractionTypes.MessageComponent) {
      if (!interaction.data) return;

      // THE INTERACTION CAME FROM A BUTTON
      if (interaction.data.componentType === MessageComponentTypes.Button) {
        await executeButtonClick(bot, interaction);
      }
    } else if (interaction.type === InteractionTypes.ModalSubmit) {
      await executeModalSubmit(bot, interaction);
    }
  };
}
