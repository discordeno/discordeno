import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { DiscordApplicationCommand } from "../../../types/discord.ts";
import { CreateApplicationCommand, transformCreateApplicationCommand } from "./createGlobalApplicationCommand.ts";

/**
 * Edit an existing global application command. If this command did not exist, it will create it.
 */
export async function upsertGlobalApplicationCommand(
  bot: Bot,
  commandId: bigint,
  command: CreateApplicationCommand,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
    transformCreateApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
