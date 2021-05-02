import { User } from "../users/user.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove */
export interface GuildBanRemove {
  /** id of the guild */
  guildId: string;
  /** The unbanned user */
  user: User;
}
