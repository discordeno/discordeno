import { DiscordEmoji } from "../discord.ts";
import { GuildMemberWithUser } from "../members/guildMember.ts";

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add */
export interface MessageReactionAdd {
  /** The id of the user */
  userId: string;
  /** The id of the channel */
  channelId: string;
  /** The id of the message */
  messageId: string;
  /** The id of the guild */
  guildId?: string;
  /** The member who reacted if this happened in a guild */
  member?: GuildMemberWithUser;
  /** The emoji used to react */
  emoji: Partial<DiscordEmoji>;
}
