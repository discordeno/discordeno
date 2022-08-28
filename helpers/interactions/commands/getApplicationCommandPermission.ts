import type { Bot } from "../../../bot.ts";
import { ApplicationCommandPermission } from "../../../transformers/applicationCommandPermission.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";

/** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
export async function getApplicationCommandPermission(
  bot: Bot,
  guildId: bigint,
  commandId: bigint,
): Promise<ApplicationCommandPermission> {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions>(
    bot.rest,
    "GET",
    bot.constants.routes.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId),
  );

  return bot.transformers.applicationCommandPermission(bot, result);
}
