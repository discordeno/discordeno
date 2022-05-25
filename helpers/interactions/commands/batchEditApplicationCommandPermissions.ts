import type { Bot } from "../../../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { ApplicationCommandPermissionTypes } from "../../../types/shared.ts";

/** Batch edits permissions for all commands in a guild. Takes an array of partial GuildApplicationCommandPermissions objects including `id` and `permissions`. */
export async function batchEditApplicationCommandPermissions(
  bot: Bot,
  guildId: bigint,
  options: { id: string; permissions: ApplicationCommandPermissions[] }[],
) {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions[]>(
    bot.rest,
    "put",
    bot.constants.routes.COMMANDS_PERMISSIONS(bot.applicationId, guildId),
    options,
  );

  return result.map((res) => bot.transformers.applicationCommandPermission(bot, res));
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions */
export interface ApplicationCommandPermissions {
  /** The id of the role or user */
  id: string;
  /** Role or User */
  type: ApplicationCommandPermissionTypes;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}
