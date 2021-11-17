import { MessageReactionAdd } from "./messageReactionAdd.ts";

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-emoji */
export type MessageReactionRemoveEmoji = Pick<MessageReactionAdd, "channelId" | "guildId" | "messageId" | "emoji">;
