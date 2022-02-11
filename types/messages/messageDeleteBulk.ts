/** https://discord.com/developers/docs/topics/gateway#message-delete-bulk */
export interface MessageDeleteBulk {
  /** The ids of the messages */
  ids: string[];
  /** The id of the channel */
  channelId: string;
  /** The id of the guild */
  guildId?: string;
}
