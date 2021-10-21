import type { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guild_application_command_permissions.ts";
import type {Bot} from "../../../bot.ts";

/** Fetches command permissions for a specific command for your application in a guild. Returns a GuildApplicationCommandPermissions object. */
export async function getSlashCommandPermission(bot: Bot, guildId: bigint, commandId: bigint) {
  return await bot.rest.runMethod<GuildApplicationCommandPermissions>(
      bot.rest,
    "get",
    bot.constants.endpoints.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId)
  );
}
