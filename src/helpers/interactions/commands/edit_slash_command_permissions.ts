import type { ApplicationCommandPermissions } from "../../../types/interactions/commands/application_command_permissions.ts";
import type {Bot} from "../../../bot.ts";

/** Edits command permissions for a specific command for your application in a guild. */
export async function editSlashCommandPermissions(
    bot: Bot,
  guildId: bigint,
  commandId: bigint,
  options: ApplicationCommandPermissions[]
) {
  return await bot.rest.runMethod(bot.rest,"put", bot.constants.endpoints.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId), {
    permissions: options,
  });
}
