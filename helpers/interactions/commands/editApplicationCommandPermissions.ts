import type { Bot } from "../../../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { ApplicationCommandPermissionTypes } from "../../../types/shared.ts";

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

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions */
export interface ApplicationCommandPermissions {
  /** The id of the role or user */
  id: string;
  /** Role or User */
  type: ApplicationCommandPermissionTypes;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}
