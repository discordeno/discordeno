import { SnakeCaseProps } from "../util.ts";
import { MessageReactionAdd } from "./message_reaction_add.ts";

export type MessageReactionRemove = Omit<
  MessageReactionAdd,
  "member"
>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove */
export type DiscordMessageReactionRemove = SnakeCaseProps<
  MessageReactionRemove
>;
