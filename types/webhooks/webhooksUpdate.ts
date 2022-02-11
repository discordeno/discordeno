/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export interface WebhookUpdate {
  /** id of the guild */
  guildId: string;
  /** id of the channel */
  channelId: string;
}
