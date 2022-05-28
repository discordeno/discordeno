import { InteractionTypes, MessageComponentTypes } from "../../../../deps.ts";
import { bot } from "../../mod.ts";
import { executeSlashCommand } from "../interactions/executeSlashCommand.ts";
import { logger, LogLevels } from "../../../utils/logger.ts";

const log = logger({ name: "InteractionHandler" });

export function setInteractionCreateEvent() {
  log.info("Adding `bot.events.interactionCreate` handler.");
  bot.events.interactionCreate = async (_, interaction) => {
    log.debug("New event fired:\n", interaction);
    // SLASH COMMAND
    if (interaction.type === InteractionTypes.ApplicationCommand) {
      log.debug("Slash Command Fired!");
      return await executeSlashCommand(bot, interaction);
    }

    if (interaction.type === InteractionTypes.MessageComponent) {
      if (!interaction.data) return;

      // THE INTERACTION CAME FROM A BUTTON
      if (
        interaction.data.componentType ===
          MessageComponentTypes.Button
      ) {
        log.debug("Button Event!");
        // processButtonCollectors(bot, interaction)
      }
    }
  };
  log.debug("All handlers:\n", bot.events);
}
