import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { CreateApplicationCommand, DiscordApplicationCommand } from "../../../types/mod.ts";

/**
 * Edit an existing global application command.
 */
export async function editGlobalApplicationCommand(
  bot: Bot,
  commandId: bigint,
  command: CreateApplicationCommand,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    bot.constants.routes.COMMANDS_ID(bot.applicationId, commandId),
    bot.transformers.reverse.createApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
