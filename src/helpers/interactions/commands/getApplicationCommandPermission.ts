import type { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guildApplicationCommandPermissions.ts";
import type { Bot } from "../../../bot.ts";

/** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
export async function getApplicationCommandPermission(bot: Bot, guildId: bigint, commandId: bigint) {
  const result = await bot.rest.runMethod<GuildApplicationCommandPermissions>(
    bot.rest,
    "get",
    bot.constants.endpoints.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId)
  );

  return bot.transformers.applicationCommandPermission(bot, result);
}
