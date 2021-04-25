import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { ApplicationCommandPermissions } from "../../types/interactions/application_command_permissions.ts";
import { endpoints } from "../../util/constants.ts";

/** Edits command permissions for a specific command for your application in a guild. */
export async function editSlashCommandPermissions(
  guildId: string,
  commandId: string,
  options: ApplicationCommandPermissions[],
) {
  return await rest.runMethod(
    "put",
    endpoints.COMMANDS_PERMISSION(applicationId, guildId, commandId),
    options,
  );
}
