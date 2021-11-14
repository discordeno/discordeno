import { MessageReactionAdd } from "./message_reaction_add.ts";

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export type MessageReactionRemoveEmoji = Pick<MessageReactionAdd, "channelId" | "guildId" | "messageId" | "emoji">;
