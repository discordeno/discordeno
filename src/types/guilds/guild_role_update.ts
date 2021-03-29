import { SnakeCaseProps } from "../util.ts";

export interface GuildRoleUpdate {
  /** The id of the guild */
  guildId: string;
  /** The role updated */
  role: Role;
}

/** https://discord.com/developers/docs/topics/gateway#guild-role-update */
export type DiscordGuildRoleUpdate = SnakeCaseProps<GuildRoleUpdate>;
