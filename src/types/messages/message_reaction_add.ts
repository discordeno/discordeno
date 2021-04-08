import { Emoji } from "../emojis/emoji.ts";
import { GuildMember } from "../guilds/guild_member.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

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
  member?: GuildMember;
  /** The emoji used to react */
  emoji: Partial<Emoji>;
}

/** https://discord.com/developers/docs/topics/gateway#message-reaction-add */
export type DiscordMessageReactionAdd = SnakeCasedPropertiesDeep<MessageReactionAdd>;
