/** Types for: https://discord.com/developers/docs/resources/webhook */

import type { DiscordAttachment, DiscordEmbed } from '../discord/message.js';
import type { BigString, Camelize } from '../shared.js';
import type { MessageComponents } from './components.js';
import type { AllowedMentions } from './message.js';
import type { CreatePoll } from './poll.js';
import type { FileContent } from './reference.js';

/** https://discord.com/developers/docs/resources/webhook#create-webhook-json-params */
export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image url for the default webhook avatar */
  avatar?: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#modify-webhook-json-params */
export interface ModifyWebhook {
  /** The default name of the webhook */
  name?: string;
  /** Image for the default webhook avatar */
  avatar?: BigString | null;
  /** The new channel id this webhook should be moved to */
  channelId?: BigString;
}

/** https://discord.com/developers/docs/resources/webhook#execute-webhook */
export interface ExecuteWebhook {
  // Query Parameters

  /** Waits for server confirmation of message send before response, and returns the created message body (defaults to `false`; when `false` a message that is not saved does not return an error) */
  wait?: boolean;
  /** Send a message to the specified thread within a webhook's channel. The thread will automatically be unarchived. */
  threadId?: BigString;
  /**
   * Whether to respect the `components` field of the request.
   * When enabled, allows application-owned webhooks to use all components and non-owned webhooks to use non-interactive components.
   *
   * @default false
   */
  withComponents?: boolean;

  // JSON Parameters

  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Override the default username of the webhook */
  username?: string;
  /** Override the default avatar of the webhook */
  avatarUrl?: string;
  /** True if this is a TTS message */
  tts?: boolean;
  /** Embedded `rich` content */
  embeds?: Camelize<DiscordEmbed>[];
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /**
   * The components to include with the message
   *
   * @remarks
   * Application-owned webhooks can always send components.
   * Non-application-owned webhooks cannot send interactive components, and the `components` field will be ignored unless they set the `with_components` query param.
   */
  components?: MessageComponents;
  /** The contents of the files being sent */
  files?: FileContent[];
  /** Attachment objects with filename and description */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[];
  /**
   * Message flags combined in a bitfield
   *
   * @see {@link MessageFlags}
   */
  flags?: number;
  /** Name of the thread to create (target channel has to be type of forum channel) */
  threadName?: string;
  /** Array of tag ids to apply to the thread (requires the webhook channel to be a forum or media channel) */
  appliedTags?: BigString[];
  /** A poll object */
  poll?: CreatePoll;
}

/** https://discord.com/developers/docs/resources/webhook#get-webhook-message-query-string-params */
export interface GetWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: BigString;
}

/** https://discord.com/developers/docs/resources/webhook#edit-webhook-message */
export interface EditWebhookMessageOptions {
  // Query parameters
  /** Id of the thread the message is in */
  threadId?: BigString;
  /**
   * Whether to respect the `components` field of the request.
   * When enabled, allows application-owned webhooks to use all components and non-owned webhooks to use non-interactive components.
   *
   * @default false
   */
  withComponents?: boolean;

  // JSON parameters

  /** The message contents (up to 2000 characters) */
  content?: string;
  /** Embedded `rich` content */
  embeds?: Camelize<DiscordEmbed>[];
  /**
   * Message flags combined in a bitfield
   *
   * @see {@link MessageFlags}
   */
  flags?: number;
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions;
  /**
   * The components to include with the message
   *
   * @remarks
   * Application-owned webhooks can always send components.
   * Non-application-owned webhooks cannot send interactive components, and the `components` field will be ignored unless they set the `with_components` query param.
   */
  components?: MessageComponents;
  /** The contents of the files being sent */
  files?: FileContent[];
  /** Attached files to keep and possible descriptions for new files */
  attachments?: Pick<DiscordAttachment, 'filename' | 'description' | 'id'>[];
  /**
   * A poll!
   *
   * @remarks
   * Polls can only be added when editing a deferred interaction response.
   */
  poll?: CreatePoll;
}

/** https://discord.com/developers/docs/resources/webhook#delete-webhook-message-query-string-params */
export interface DeleteWebhookMessageOptions {
  /** id of the thread the message is in */
  threadId: BigString;
}
