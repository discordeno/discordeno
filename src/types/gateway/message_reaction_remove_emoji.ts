import { SnakeCaseProps } from "../util.ts";
import { MessageReactionAdd } from "./message_reaction_add.ts";

export type MessageReactionRemoveEmoji = Pick<
  MessageReactionAdd,
  "channelId" | "guildId" | "messageId" | "emoji"
>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export type DiscordMessageReactionRemoveEmoji = SnakeCaseProps<
  MessageReactionRemoveEmoji
>;
