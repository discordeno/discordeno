import type { Bot } from "../../../bot.ts";
import { ApplicationCommand } from "../../../transformers/applicationCommand.ts";
import { BigString, CreateApplicationCommand, DiscordApplicationCommand } from "../../../types/mod.ts";

// TODO: Swap `commandId` and `guildId` parameters.

/**
 * Edits an application command registered in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to edit.
 * @param options - The parameters for the edit of the command.
 * @returns An instance of the edited {@link ApplicationCommand}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-guild-application-command}
 */
export async function editGuildApplicationCommand(
  bot: Bot,
  commandId: BigString,
  guildId: BigString,
  options: CreateApplicationCommand,
): Promise<ApplicationCommand> {
  const result = await bot.rest.runMethod<DiscordApplicationCommand>(
    bot.rest,
    "PATCH",
    bot.constants.routes.COMMANDS_GUILD_ID(bot.applicationId, guildId, commandId),
    bot.transformers.reverse.createApplicationCommand(bot, options),
  );

  return bot.transformers.applicationCommand(bot, result);
}
