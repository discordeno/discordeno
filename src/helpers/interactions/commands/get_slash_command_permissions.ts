import type {Bot} from "../../../bot.ts";
import type { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guild_application_command_permissions.ts";

/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
export async function getSlashCommandPermissions(bot: Bot, guildId: bigint) {
  return await bot.rest.runMethod<GuildApplicationCommandPermissions[]>(
      bot.rest,
    "get",
    bot.constants.endpoints.COMMANDS_PERMISSIONS(bot.applicationId, guildId)
  );
}
