import type { Bot } from "../../../bot.ts";
import { ApplicationCommandPermission } from "../../../transformers/applicationCommandPermission.ts";
import { DiscordGuildApplicationCommandPermissions } from "../../../types/discord.ts";
import { ApplicationCommandPermissionTypes, BigString } from "../../../types/shared.ts";

// TODO: Make `options` into an object with a `permissions` field.

/**
 * Edits the permissions for a guild application command.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild the command is registered in.
 * @param commandId - The ID of the command to edit the permissions of.
 * @param bearerToken - The bearer token to use to make the request.
 * @param options - The parameters for the edit of the command permissions.
 * @returns An instance of the edited {@link ApplicationCommandPermission}.
 *
 * @remarks
 * The bearer token requires the `applications.commands.permissions.update` scope to be enabled, and to have access to the guild whose ID has been provided in the parameters.
 *
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions}
 */
export async function editApplicationCommandPermissions(
  bot: Bot,
  guildId: BigString,
  commandId: BigString,
  /** Bearer token which has the `applications.commands.permissions.update` scope and also access to this guild.  */
  bearerToken: string,
  options: ApplicationCommandPermissions[],
): Promise<ApplicationCommandPermission> {
  const result = await bot.rest.runMethod<DiscordGuildApplicationCommandPermissions>(
    bot.rest,
    "PUT",
    bot.constants.routes.COMMANDS_PERMISSION(bot.applicationId, guildId, commandId),
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
