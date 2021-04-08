import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildBanAddRemove {
  /** id of the guild */
  guildId: string;
  /** The banned user */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add */
export type DiscordGuildBanAddRemove = SnakeCasedPropertiesDeep<GuildBanAddRemove>;
