import { SnakeCaseProps } from "../util.ts";

export interface GuildRoleDelete {
  /** id of the guild */
  guildId: string;
  /** id of the role */
  roleId: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-delete */
export type DiscordGuildRoleDelete = SnakeCaseProps<GuildRoleDelete>;
