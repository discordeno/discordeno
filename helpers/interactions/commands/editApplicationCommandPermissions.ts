import type { Bot } from "../../../bot.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { ApplicationCommandPermissionTypes } from "../../../types/shared.ts";

/** Edits command permissions for a specific command for your application in a guild. */
export async function editApplicationCommandPermissions(
  bot: Bot,
  guildId: bigint,
  commandId: bigint,
  /** Bearer token which has the `applications.commands.permissions.update` scope and also access to this guild.  */
  bearerToken: string,
  options: ApplicationCommandPermissions[],
) {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions>(
    bot.rest,
    "put",
    bot.constants.endpoints.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId),
    {
      permissions: options,
    },
    {
      headers: { authorization: `Bearer ${bearerToken}` },
    },
  );

  return bot.transformers.applicationCommandPermission(bot, result);
}

/** https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions */
export interface ApplicationCommandPermissions {
  /** The id of the role or user */
  id: string;
  /** Role or User */
  type: ApplicationCommandPermissionTypes;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}
