import { SnakeCasedPropertiesDeep } from "../util.ts";
import { MessageReactionAdd } from "./message_reaction_add.ts";

export type MessageReactionRemoveAll = Pick<
  MessageReactionAdd,
  "channelId" | "messageId" | "guildId"
>;

/** https://discord.com/developers/docs/topics/gateway#message-reaction-remove-all */
export type DiscordMessageReactionRemoveAll = SnakeCasedPropertiesDeep<MessageReactionRemoveAll>;
