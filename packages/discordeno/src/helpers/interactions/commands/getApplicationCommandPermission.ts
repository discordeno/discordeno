import type { Bot } from "../../../bot.ts";
import { ApplicationCommandPermission } from "../../../transformers/applicationCommandPermission.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Gets the permissions of a guild application command.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to get the permissions of.
 * @returns An instance of {@link ApplicationCommandPermission}.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#get-application-command-permissions}
 */
export async function getApplicationCommandPermission(
  bot: Bot,
  guildId: BigString,
  commandId: BigString,
): Promise<ApplicationCommandPermission> {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId),
  );

  return bot.transformers.applicationCommandPermission(bot, result);
}
