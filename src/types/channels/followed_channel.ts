/** https://discord.com/developers/docs/resources/channel#followed-channel-object */
export interface FollowedChannel {
  /** Source message id */
  channelId: string;
  /** Created target webhook id */
  webhookId: string;
}
