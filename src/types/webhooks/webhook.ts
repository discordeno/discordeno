import { SnakeCaseProps } from "../util.ts";

export interface Webhook {
  /** The id of the webhook */
  id: string;
  /** The type of the webhook */
  type: WebhookTypes;
  /** The guild id this webhook is for */
  guildId?: string;
  /** The channel id this webhook is for */
  channelId: string;
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User;
  /** The default name of the webhook */
  name: string | null;
  /** The default avatar of the webhook */
  avatar: string | null;
  /** The secure token of the webhook (returned for Incomming Webhooks) */
  token?: string;
  /** The bot/OAuth2 application that created this webhook */
  applicationId: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type DiscordWebhook = SnakeCaseProps<Webhook>;
