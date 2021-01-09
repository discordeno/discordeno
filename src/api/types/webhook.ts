import { AllowedMentions, Embed } from "./channel.ts";
import { User } from "./user.ts";

/** https://discord.com/developers/docs/resources/webhook#webhook-resource */
export interface Webhook {
  /** the id of the webhook */
  id: string;
  /** the type of the webhook */
  type: WebhookType;
  /** the guild id this webhook is for */
  guildID?: string;
  /** the channel id this webhook is for */
  channelID: string;
  /** the user this webhook was created by (not returned when getting a webhook with its token) */
  user?: User;
  /** the default name of the webhook */
  name: string | null;
  /** the default avatar of the webhook */
  avatar: string | null;
  /** the secure token of the webhook (returned for Incoming Webhooks) */
  token?: string;
  /** the bot/OAuth2 application that created this webhook */
  applicationID: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#webhook-resource */
export type WebhookType =
  | "INCOMING"
  | "CHANNEL_FOLLOWER";

/** https://discord.com/developers/docs/resources/webhook#create-webhook */
export interface CreateWebhookOptions {
  /** name of the webhook (1-80 characters), cannot be clyde */
  name: string;
  /** image for the default webhook avatar */
  avatar: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook */
export interface ModifyWebhookOptions {
  /** the default name of the webhook */
  name?: string;
  /** image for the default webhook avatar */
  avatar?: string | null;
  /** the new channel id this webhook should be moved to */
  channelID?: string;
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhookOptions {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to false; when false a message that is not saved does not return an error) */
  wait?: boolean;
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** override the default username of the webhook */
  username?: string;
  /** override the default avatar of the webhook */
  avatarUrl?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** the content of the file being sent */
  file?: unknown;
  /** embedded rich content */
  embeds?: Embed[];
  /** JSON-serialized  */
  payloadJson: string;
  /** allowed mentions for the message */
  allowedMentions: AllowedMentions;
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
export interface EditWebhookMessageOptions {
  /** the messages contents (up to 2000 characters) */
  content?: string | null;
  /** embedded rich content */
  embeds?: Embed[] | null;
  /** allowed mentions for the message */
  allowedMentions?: AllowedMentions | null;
}
