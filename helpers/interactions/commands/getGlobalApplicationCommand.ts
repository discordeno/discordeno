import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";

/** Fetches the global command for the given Id */
export async function getGlobalApplicationCommand(bot: Bot, commandId: bigint): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
  );

  return bot.transformers.applicationCommand(bot, result);
}
