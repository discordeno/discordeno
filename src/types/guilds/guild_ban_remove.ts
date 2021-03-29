import { User } from "../users/user.ts";
import { SnakeCaseProps } from "../util.ts";

export interface GuildBanRemove {
  /** id of the guild */
  guildId: string;
  /** The unbanned user */
  user: User;
}

/** https://discord.com/developers/docs/topics/gateway#guild-ban-remove */
export type DiscordGuildBanRemove = SnakeCaseProps<GuildBanRemove>;
