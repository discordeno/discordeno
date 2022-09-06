import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { CreateApplicationCommand, DiscordApplicationCommand } from "../../../types/mod.ts";

/**
 * Edit an existing guild application command.
 */
export async function editGuildApplicationCommand(
  bot: Bot,
  commandId: bigint,
  guildId: bigint,
  command: CreateApplicationCommand,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId),
    bot.transformers.reverse.createApplicationCommand(bot, command),
  );

  return bot.transformers.applicationCommand(bot, result);
}
