import { MessageReactionAdd } from "./messageReactionAdd.ts";

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all */
export type MessageReactionRemoveAll = Pick<MessageReactionAdd, "channelId" | "messageId" | "guildId">;
