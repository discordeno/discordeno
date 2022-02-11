export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image for the default webhook avatar */
  avatar?: string | null;
  /** The reason you are creating this webhook */
  reason?: string;
}
