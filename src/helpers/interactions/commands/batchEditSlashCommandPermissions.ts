import type { Bot } from "../../../bot.ts";
import type { ApplicationCommandPermissions } from "../../../types/interactions/commands/applicationCommandPermissions.ts";
import { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guildApplicationCommandPermissions.ts";

/** Batch edits permissions for all commands in a guild. Takes an array of partial GuildApplicationCommandPermissions objects including `id` and `permissions`. */
export async function batchEditSlashCommandPermissions(
  bot: Bot,
  guildId: bigint,
  options: { id: string; permissions: ApplicationCommandPermissions[] }[]
) {
  const result = await bot.rest.runMethod<GuildApplicationCommandPermissions[]>(
    bot.rest,
    "put",
    bot.constants.endpoints.COMMANDS_PERMISSIONS(bot.applicationId, guildId),
    options
  );

  return result.map((res) => bot.transformers.applicationCommandPermission(bot, res));
}
