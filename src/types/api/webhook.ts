import { DicordUser } from "./member.ts";

/** https://discord.com/developers/docs/resources/webhook#webhook-resource */
export interface DiscordWebhookPayload {
  /** the id of the webhook */
  id: string;
  /** the type of the webhook */
  type: DiscordWebhookTypes;
  /** the guild id this webhook is for */
  guild_id?: string;
  /** the channel id this webhook is for */
  channel_id: string;
  /** the user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordUser;
  /** the default name of the webhook */
  name: string | null;
  /** the default avatar of the webhook */
  avatar: string | null;
  /** the secure token of the webhook (returned for Incoming Webhooks) */
  token?: string;
  /** the bot/OAuth2 application that created this webhook */
  application_id: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-resource */
export enum DiscordWebhookTypes {
  /** Incoming Webhook can post messages to channels with a generated token */
  INCOMING = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  CHANNEL_FOLLOWER,
}