import type { Bot } from "../../../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { ApplicationCommandPermissions } from "./batchEditApplicationCommandPermissions.ts";

/** Edits command permissions for a specific command for your application in a guild. */
export async function editApplicationCommandPermissions(
  bot: Bot,
  guildId: bigint,
  commandId: bigint,
  options: ApplicationCommandPermissions[],
) {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions>(
    bot.rest,
    "put",
    bot.constants.endpoints.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId),
    {
      permissions: options,
    },
  );

  return bot.transformers.applicationCommandPermission(bot, result);
}
