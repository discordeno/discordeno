import { GuildMember } from "../members/guildMember.ts";

/** https://discord.com/developers/docs/topics/gateway#typing-start */
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
