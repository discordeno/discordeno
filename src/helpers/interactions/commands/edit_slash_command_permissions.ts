import { applicationId } from "../../../bot.ts";
import { rest } from "../../../rest/rest.ts";
import type { ApplicationCommandPermissions } from "../../../types/interactions/commands/application_command_permissions.ts";
import { endpoints } from "../../../util/constants.ts";
import { snakelize } from "../../../util/utils.ts";

/** Edits command permissions for a specific command for your application in a guild. */
export async function editSlashCommandPermissions(
  guildId: bigint,
  commandId: bigint,
  options: ApplicationCommandPermissions[]
) {
  return await rest.runMethod("put", endpoints.COMMANDS_PERMISSION(applicationId, guildId, commandId), {
    permissions: snakelize(options),
  });
}
