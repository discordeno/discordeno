import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface MessageDeleteBulk {
  /** The ids of the messages */
  ids: string[];
  /** The id of the channel */
  channelId: string;
  /** The id of the guild */
  guildId?: string;
}

/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk */
export type DiscordMessageDeleteBulk = SnakeCasedPropertiesDeep<
  MessageDeleteBulk
>;
