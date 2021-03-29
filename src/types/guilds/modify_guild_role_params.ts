import { SnakeCaseProps } from "../util.ts";

export interface ModifyGuildRoleParams {
  /** Name of the role */
  name?: string | null;
  // TODO: Permission[]
  /** Bitwise value of the enabled/disabled permissions */
  permissions?: string | null;
  /** RGB color value */
  color?: number | null;
  /** Whether the role should be displayed seperately in the sidebar */
  hoist?: boolean | null;
  /** Whether the role should be mentionable */
  mentionable?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role */
export type DiscordModifyGuildRoleParams = SnakeCaseProps<
  ModifyGuildRoleParams
>;
