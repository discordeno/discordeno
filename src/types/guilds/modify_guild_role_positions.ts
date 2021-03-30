import { SnakeCaseProps } from "../util.ts";

export interface ModifyGuildRolePositions {
  /** Role id */
  id: string;
  /** Sorting position of the role */
  position?: number | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-role-positions */
export type DiscordModifyGuildRolePositions = SnakeCaseProps<
  ModifyGuildRolePositions
>;
