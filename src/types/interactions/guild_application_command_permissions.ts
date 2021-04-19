import { SnakeCasedPropertiesDeep } from "../util.ts";
import { ApplicationCommandPermissions } from "./application_command_permissions.ts";

export interface GuildApplicationCommandPermissions {
  /** The id of the command */
  id: string;
  /** The id of the application to command belongs to */
  applicationId: string;
  /** The id of the guild */
  guildId: string;
  /** The permissions for the command in the guild */
  permissions: ApplicationCommandPermissions[];
}

/** https://discord.com/developers/docs/interactions/slash-commands#guildapplicationcommandpermissions */
export type DiscordGuildApplicationCommandPermissions =
  SnakeCasedPropertiesDeep<GuildApplicationCommandPermissions>;
