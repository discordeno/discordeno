import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildMemberRemove {
  /** The id of the guild */
  guildId: string;
  /** The user who was removed */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove */
export type DiscordGuildMemberRemove = SnakeCasedPropertiesDeep<GuildMemberRemove>;
