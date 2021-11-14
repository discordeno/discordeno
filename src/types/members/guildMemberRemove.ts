import { User } from "../users/user.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-member-remove */
export interface GuildMemberRemove {
  /** The id of the guild */
  guildId: string;
  /** The user who was removed */
  user: User;
}
