import { InteractionTypes, MessageComponentTypes } from "../../../../deps.ts";
import { bot } from "../../mod.ts";
import { executeSlashCommand } from "../interactions/executeSlashCommand.ts";

export function setInteractionCreateEvent() {
  bot.events.interactionCreate = async function (_, interaction) {
    // SLASH COMMAND
    if (interaction.type === InteractionTypes.ApplicationCommand) {
      return await executeSlashCommand(bot, interaction);
    }

    if (interaction.type === InteractionTypes.MessageComponent) {
      if (!interaction.data) return;

      // THE INTERACTION CAME FROM A BUTTON
      if (
        interaction.data.componentType ===
          MessageComponentTypes.Button
      ) {
        // processButtonCollectors(bot, interaction)
      }
    }
  };
}
