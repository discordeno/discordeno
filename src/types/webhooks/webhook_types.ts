/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
export enum WebookTypes {
  /** Incomming Webhooks can post messages to channels with a generated token */
  Incomming = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  ChannelFollower,
}
