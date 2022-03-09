import { DiscordUser } from "../discord.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add */
export interface GuildBanAddRemove {
  /** id of the guild */
  guildId: string;
  /** The banned user */
  user: DiscordUser;
}
