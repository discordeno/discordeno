import { Bot } from "../../bot.ts";
import { configs } from "../../configs.ts";

export async function updateApplicationCommands() {
  await Bot.helpers.upsertApplicationCommands(
    Bot.commands
      // ONLY GLOBAL COMMANDS
      .filter((command) => !command.devOnly)
      .array(),
  );

  await Bot.helpers.upsertApplicationCommands(
    Bot.commands
      // ONLY GLOBAL COMMANDS
      .filter((command) => !!command.devOnly)
      .array(),
    configs.devGuildId,
  );
}
