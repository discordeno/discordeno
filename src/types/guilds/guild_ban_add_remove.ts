import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";

export interface GuildBanAdd {
  /** id of the guild */
  guildId: string;
  /** The banned user */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-add */
export type DiscordGuildBanAdd = SnakeCaseProps<GuildBanAdd>;
