import { AllowedMentionsPayload, EmbedPayload } from "./channel.ts";
import { UserPayload } from "./user.ts";

/** https://discord.com/developers/docs/resources/webhook#webhook-resource */
export interface WebhookPayload {
  /** the id of the webhook */
  id: string;
  /** the type of the webhook */
  type: WebhookTypes;
  /** the guild id this webhook is for */
  guild_id?: string;
  /** the channel id this webhook is for */
  channel_id: string;
  /** the user this webhook was created by (not returned when getting a webhook with its token) */
  user?: UserPayload;
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
export enum WebhookTypes {
  /** Incoming Webhook can post messages to channels with a generated token */
  INCOMING = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  CHANNEL_FOLLOWER,
}

/** https://discord.com/developers/docs/resources/webhook#create-webhook */
export interface CreateWebhookParams {
  /** name of the webhook (1-80 characters), cannot be clyde */
  name: string;
  /** image for the default webhook avatar */
  avatar: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook */
export interface ModifyWebhookParams {
  /** the default name of the webhook */
  name?: string;
  /** image for the default webhook avatar */
  avatar?: string | null;
  /** the new channel id this webhook should be moved to */
  channel_id?: string;
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhookQueryParams {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to false; when false a message that is not saved does not return an error) */
  wait?: boolean;
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhookParams {
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** override the default username of the webhook */
  username?: string;
  /** override the default avatar of the webhook */
  avatar_url?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** the content of the file being sent */
  file?: unknown;
  /** embedded rich content */
  embeds?: EmbedPayload[];
  /** JSON-serialized payload */
  payload_json: string;
  /** allowed mentions for the message */
  allowed_mentions: AllowedMentionsPayload;
}

/** https://discord.com/developers/docs/resources/webhook#execute-slackcompatible-webhook */
export interface ExecuteSlackCompatibleWebhook {
  /** 	waits for server confirmation of message send before response (defaults to true; when false a message that is not saved does not return an error) */
  wait?: boolean;
}

/** https://discord.com/developers/docs/resources/webhook#execute-githubcompatible-webhook */
export interface ExecuteGitHubCompatibleWebhook {
  /** 	waits for server confirmation of message send before response (defaults to true; when false a message that is not saved does not return an error) */
  wait?: boolean;
}

/** 	waits for server confirmation of message send before response (defaults to true; when false a message that is not saved does not return an error) */
export interface EditWebhookMessageParams {
  /** the messages contents (up to 2000 characters) */
  content?: string | null;
  /** embedded rich content */
  embeds: EmbedPayload[];
  /** allowed mentions for the message */
  allowed_mentions: AllowedMentionsPayload;
}
