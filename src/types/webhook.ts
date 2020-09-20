import type { UserPayload } from "./guild.ts";
import type { Embed } from "./message.ts";

export interface WebhookPayload {
  /** The id of the webhook */
  id: string;
  /** The type of the webhook */
  type: WebhookType;
  /** The guild id this webhook is for */
  guild_id?: string;
  /** The channel id this webhook is for */
  channel_id: string;
  /** The user this webhook was created by(not returned when getting a webhook with its token) */
  user?: UserPayload;
  /** The default name of the webhook */
  name?: string;
  /** The default avatar of the webhook */
  avatar?: string;
  /** The secure token of the webhook(returned for Incoming Webhooks) */
  token?: string;
}

export enum WebhookType {
  /** Incoming Webhooks can post messages to channels with a generated token */
  INCOMING = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  CHANNEL_FOLLOWER = 2,
}

export interface WebhookCreateOptions {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image url for avatar image for the default webhook avatar */
  avatar?: string;
}

export interface ExecuteWebhookOptions {
  /** waits for server confirmation of message send before response, and returns the created message body (defaults to false; when false a message that is not saved does not return an error) */
  wait?: boolean;
  /** the message contents (up to 2000 characters) */
  content?: string;
  /** override the default username of the webhook */
  username?: string;
  /** override the default avatar of the webhook*/
  avatar_url?: string;
  /** true if this is a TTS message */
  tts?: boolean;
  /** file contents	the contents of the file being sent	one of content, file, embeds */
  file?: { blob: unknown; name: string };
  /** array of up to 10 embed objects	embedded rich content. */
  embeds?: Embed[];
  /** allowed mentions for the message */
  mentions?: {
    /** An array of allowed mention types to parse from the content. */
    parse: ("roles" | "users" | "everyone")[];
    /** Array of role_ids to mention (Max size of 100) */
    roles?: string[];
    /** Array of user_ids to mention (Max size of 100) */
    users?: string[];
  };
}
