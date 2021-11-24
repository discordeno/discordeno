import type { ApplicationCommandPermissions } from "../../../types/interactions/commands/applicationCommandPermissions.ts";
import type { Bot } from "../../../bot.ts";
import { GuildApplicationCommandPermissions } from "../../../types/interactions/commands/guildApplicationCommandPermissions.ts";

/** Edits command permissions for a specific command for your application in a guild. */
export async function editApplicationCommandPermissions(
  bot: Bot,
  guildId: bigint,
  commandId: bigint,
  options: ApplicationCommandPermissions[]
) {
  const result = await bot.rest.runMethod<GuildApplicationCommandPermissions>(
    bot.rest,
    "put",
    bot.constants.endpoints.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId),
    {
      permissions: options,
    }
  );

  return bot.transformers.applicationCommandPermission(bot, result);
}
