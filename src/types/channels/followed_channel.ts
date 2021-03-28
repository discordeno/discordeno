/** https://discord.com/developers/docs/resources/channel#followed-channel-object */
export interface DiscordFollowedChannel {
  /** Source message id */
  channel_id: string;
  /** Created target webhook id */
  webhook_id: string;
}
