/** https://discord.com/developers/docs/resources/webhook#modify-webhook-json-params */
export interface ModifyWebhook {
  /** The default name of the webhook */
  name?: string;
  /** Image for the default webhook avatar */
  avatar?: string | null;
  /** The new channel id this webhook should be moved to */
  channelId?: string;
  /** The reason you are modifying this webhook */
  reason?: string;
}
