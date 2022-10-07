import { Bot } from "../../bot.ts";
import { configs } from "../../configs.ts";

export async function updateApplicationCommands() {
  await Bot.helpers.upsertGlobalApplicationCommands(
    Bot.commands
      // ONLY GLOBAL COMMANDS
      .filter((command) => !command.devOnly)
      .array(),
  );

  await Bot.helpers.upsertGuildApplicationCommands(
    configs.devGuildId,
    Bot.commands
      // ONLY GLOBAL COMMANDS
      .filter((command) => !!command.devOnly)
      .array(),
  );
}
