import type {Bot} from "../../../bot.ts";
import type { ApplicationCommandPermissions } from "../../../types/interactions/commands/application_command_permissions.ts";

/** Batch edits permissions for all commands in a guild. Takes an array of partial GuildApplicationCommandPermissions objects including `id` and `permissions`. */
export async function batchEditSlashCommandPermissions(
    bot: Bot,
  guildId: bigint,
  options: { id: string; permissions: ApplicationCommandPermissions[] }[]
) {
  return await bot.rest.runMethod(bot.rest,"put", bot.constants.endpoints.COMMANDS_PERMISSIONS(bot.applicationId, guildId), options);
}
