import { DiscordRole } from "../discord.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-role-update */
export interface GuildRoleUpdate {
  /** The id of the guild */
  guildId: string;
  /** The role updated */
  role: DiscordRole;
}
