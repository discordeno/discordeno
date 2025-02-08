/** Types for: https://discord.com/developers/docs/resources/webhook */

import type { DiscordChannel } from './channel.js'
import type { DiscordGuild } from './guild.js'
import type { DiscordUser } from './user.js'

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export type DiscordWebhook = DiscordIncomingWebhook | DiscordApplicationWebhook

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export interface DiscordIncomingWebhook {
  /** The type of the webhook */
  type: WebhookTypes
  /** The secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string
  /** The id of the webhook */
  id: string
  /** The guild id this webhook is for */
  guild_id?: string
  /** The channel id this webhook is for */
  channel_id: string
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordUser
  /** The default name of the webhook */
  name: string | null
  /** The default user avatar hash of the webhook */
  avatar: string | null
  /** The bot/OAuth2 application that created this webhook */
  application_id: string | null
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_guild?: Partial<DiscordGuild>
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  source_channel?: Partial<DiscordChannel>
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure */
export interface DiscordApplicationWebhook {
  /** The type of the webhook */
  type: WebhookTypes.Application
  /** The secure token of the webhook (returned for Incoming Webhooks) */
  token?: string
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string

  /** The id of the webhook */
  id: string
  /** The guild id this webhook is for */
  guild_id?: string | null
  /** The channel id this webhook is for */
  channel_id?: string | null
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordUser
  /** The default name of the webhook */
  name: string | null
  /** The default user avatar hash of the webhook */
  avatar: string | null
  /** The bot/OAuth2 application that created this webhook */
  application_id: string | null
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides */
  source_guild?: Partial<DiscordGuild>
  /** The channel that this webhook is following (returned for Channel Follower Webhooks), field will be absent if the webhook creator has since lost access to the guild where the followed channel resides */
  source_channel?: Partial<DiscordChannel>
}

/** https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types */
export enum WebhookTypes {
  /** Incoming Webhooks can post messages to channels with a generated token */
  Incoming = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  ChannelFollower,
  /** Application webhooks are webhooks used with Interactions */
  Application,
}

/** https://discord.com/developers/docs/resources/webhook#create-webhook-json-params */
export interface DiscordCreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string
  /** Image url for the default webhook avatar */
  avatar?: string | null
}
