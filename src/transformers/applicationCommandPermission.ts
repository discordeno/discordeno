import { Bot } from "../bot.ts";
import { DiscordApplicationCommandPermissionTypes } from "../types/interactions/commands/application_command_permission_types.ts";
import { GuildApplicationCommandPermissions } from "../types/interactions/commands/guild_application_command_permissions.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformApplicationCommandPermission(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<GuildApplicationCommandPermissions>
): DiscordenoApplicationCommandPermission {
  return {
    id: bot.transformers.snowflake(payload.id),
    applicationId: bot.transformers.snowflake(payload.application_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
    permissions: payload.permissions.map((perm) => ({
      id: bot.transformers.snowflake(perm.id),
      type: perm.type,
      permission: perm.permission,
    })),
  };
}

export interface DiscordenoApplicationCommandPermission {
  /** The id of the command */
  id: bigint;
  /** The id of the application to command belongs to */
  applicationId: bigint;
  /** The id of the guild */
  guildId: bigint;
  /** The permissions for the command in the guild */
  permissions: {
    /** The id of the role or user */
    id: bigint;
    /** Role or User */
    type: DiscordApplicationCommandPermissionTypes;
    /** `true` to allow, `false`, to disallow */
    permission: boolean;
  }[];
}
