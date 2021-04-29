import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { GuildApplicationCommandPermissions } from "../../types/interactions/guild_application_command_permissions.ts";
import { endpoints } from "../../util/constants.ts";

/** Fetches command permissions for all commands for your application in a guild. Returns an array of GuildApplicationCommandPermissions objects. */
export async function getSlashCommandPermissions(guildId: string) {
  return await rest.runMethod<GuildApplicationCommandPermissions[]>(
    "get",
    endpoints.COMMANDS_PERMISSIONS(applicationId, guildId),
  );
}
