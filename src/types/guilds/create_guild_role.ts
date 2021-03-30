import { SnakeCaseProps } from "../util.ts";

export interface CreateGuildRole {
  /** Name of the role, default: "new role" */
  name?: string;
  // TODO: Permission[]
  /** Bitwise value of the enabled/disabled permissions, default: everyone permissions in guild */
  permissions?: string;
  /** RGB color value, default: 0 */
  color?: number;
  /** Whether the role should be displayed separately in the sidebar, default: false */
  hoist?: boolean;
  /** Whether the role should be mentionable, default: false */
  mentionable?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-role */
export type DiscordCreateGuildRole = SnakeCaseProps<
  CreateGuildRole
>;
