import { MessageReactionAdd } from "./message_reaction_add.ts";

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove */
export type MessageReactionRemove = Omit<MessageReactionAdd, "member">;
