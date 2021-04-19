import { DiscordApplicationCommandPermissionTypes } from "./application_command_permission_types.ts";

export interface ApplicationCommandPermissions {
  /** The id of the role or user */
  id: string;
  /** Role or User */
  type: DiscordApplicationCommandPermissionTypes;
  /** `true` to allow, `false`, to disallow */
  permission: boolean;
}

/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandpermissions */
export type DiscordApplicationCommandPermissions =
  ApplicationCommandPermissions;
