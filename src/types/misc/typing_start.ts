import { GuildMember } from "../guilds/guild_member.ts";
import { SnakeCaseProps } from "../util.ts";

export interface TypingStart {
  /** id of the channel */
  channelId: string;
  /** id of the guild */
  guildId?: string;
  /** id of the user */
  userId: string;
  /** Unix time (in seconds) of when the user started typing */
  timestamp: number;
  /** The member who started typing if this happened in a guild */
  member?: GuildMember;
}

/** https://discord.com/developers/docs/topics/gateway#typing-start */
export type DiscordTypingStart = SnakeCaseProps<TypingStart>;
