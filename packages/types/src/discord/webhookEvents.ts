/** Types for: https://discord.com/developers/docs/events/webhook-events */

import type { DiscordApplicationIntegrationType } from './application.js'
import type { DiscordChannel } from './channel.js'
import type { DiscordEntitlement } from './entitlement.js'
import type { DiscordGuild } from './guild.js'
import type { DiscordMessage, MessageFlags, MessageTypes } from './message.js'
import type { OAuth2Scope } from './oauth2.js'
import type { DiscordUser } from './user.js'

/** https://discord.com/developers/docs/events/webhook-events#payload-structure */
export interface DiscordEventWebhookEvent {
  /** Version scheme for the webhook event. Currently always 1 */
  version: 1
  /** ID of your app */
  application_id: string
  /** Type of webhook, either 0 for PING or 1 for webhook events */
  type: DiscordWebhookEventType
  /** Event data payload */
  event?: DiscordEventWebhookEventBody
}

/** https://discord.com/developers/docs/events/webhook-events#webhook-types */
export enum DiscordEventWebhookType {
  /** PING event sent to verify your Webhook Event URL is active */
  Ping = 0,
  /** Webhook event (details for event in event body object) */
  Event = 1,
}

/** https://discord.com/developers/docs/events/webhook-events#event-body-object */
export interface DiscordEventWebhookEventBody {
  /** Event type */
  type: DiscordWebhookEventType
  /** Timestamp of when the event occurred in ISO8601 format */
  timestamp: string
  /** Data for the event. The shape depends on the event type */
  data?:
    | DiscordEventWebhookApplicationAuthorizedBody
    | DiscordEventWebhookApplicationDeauthorizedBody
    | DiscordEventWebhookEntitlementCreateBody
    | DiscordEventWebhookLobbyMessageCreateBody
    | DiscordEventWebhookLobbyMessageUpdateBody
    | DiscordEventWebhookLobbyMessageDeleteBody
    | DiscordEventWebhookGameDirectMessageCreateBody
    | DiscordEventWebhookGameDirectMessageUpdateBody
    | DiscordEventWebhookGameDirectMessageDeleteBody
}

/** https://discord.com/developers/docs/events/webhook-events#event-types */
export enum DiscordWebhookEventType {
  /** Sent when an app was authorized by a user to a server or their account */
  ApplicationAuthorized = 'APPLICATION_AUTHORIZED',
  /** Sent when an app was deauthorized by a user */
  ApplicationDeauthorized = 'APPLICATION_DEAUTHORIZED',
  /** Entitlement was created */
  EntitlementCreate = 'ENTITLEMENT_CREATE',
  /** User was added to a Quest (currently unavailable) */
  QuestUserEnrollment = 'QUEST_USER_ENROLLMENT',
  /** Sent when a message is created in a lobby */
  LobbyMessageCreate = 'LOBBY_MESSAGE_CREATE',
  /** Sent when a message is updated in a lobby */
  LobbyMessageUpdate = 'LOBBY_MESSAGE_UPDATE',
  /** Sent when a message is deleted from a lobby */
  LobbyMessageDelete = 'LOBBY_MESSAGE_DELETE',
  /** Sent when a direct message is created during an active Social SDK session */
  GameDirectMessageCreate = 'GAME_DIRECT_MESSAGE_CREATE',
  /** Sent when a direct message is updated during an active Social SDK session */
  GameDirectMessageUpdate = 'GAME_DIRECT_MESSAGE_UPDATE',
  /** Sent when a direct message is deleted during an active Social SDK session */
  GameDirectMessageDelete = 'GAME_DIRECT_MESSAGE_DELETE',
}

/** https://discord.com/developers/docs/events/webhook-events#application-authorized-application-authorized-structure */
export interface DiscordEventWebhookApplicationAuthorizedBody {
  /** Installation context for the authorization. Either guild (0) if installed to a server or user (1) if installed to a user's account */
  integration_type?: DiscordApplicationIntegrationType
  /** User who authorized the app */
  user: DiscordUser
  /** List of scopes the user authorized */
  scopes: OAuth2Scope[]
  /** Server which app was authorized for (when integration type is 0) */
  guild?: DiscordGuild
}

/** https://discord.com/developers/docs/events/webhook-events#application-authorized-application-authorized-structure */
export interface DiscordEventWebhookApplicationDeauthorizedBody {
  /** User who deauthorized the app */
  user: DiscordUser
}

/** https://discord.com/developers/docs/events/webhook-events#entitlement-create-entitlement-create-structure */
export type DiscordEventWebhookEntitlementCreateBody = DiscordEntitlement

/** https://discord.com/developers/docs/events/webhook-events#lobby-message-create-lobby-message-create-structure */
export type DiscordEventWebhookLobbyMessageCreateBody = DiscordSocialSDKLobbyMessage

// Discord does not explicitly says what "with additional fields for message updates" means, so we rely on the example and the DiscordMessage structure
/** https://discord.com/developers/docs/events/webhook-events#lobby-message-update-lobby-message-update-structure */
export interface DiscordEventWebhookLobbyMessageUpdateBody extends DiscordSocialSDKLobbyMessage {
  /** ISO8601 timestamp of when the message was last edited */
  edited_timestamp: string | null
  /** ISO8601 timestamp of when the message was created */
  timestamp: string
}

/** https://discord.com/developers/docs/events/webhook-events#lobby-message-delete-lobby-message-delete-structure */
export interface DiscordEventWebhookLobbyMessageDeleteBody {
  /** ID of the deleted message */
  id: string
  /** ID of the lobby where the message was deleted */
  lobby_id: string
}

/** https://discord.com/developers/docs/events/webhook-events#game-direct-message-create-game-direct-message-create-structure */
export type DiscordEventWebhookGameDirectMessageCreateBody = DiscordSocialSDKMessage | DiscordSocialSDKPassthroughMessage

/** https://discord.com/developers/docs/events/webhook-events#game-direct-message-update-game-direct-message-update-structure */
export type DiscordEventWebhookGameDirectMessageUpdateBody = DiscordSocialSDKMessage | DiscordSocialSDKPassthroughMessage

/** https://discord.com/developers/docs/events/webhook-events#game-direct-message-delete-game-direct-message-delete-structure */
export type DiscordEventWebhookGameDirectMessageDeleteBody = DiscordSocialSDKMessage | DiscordSocialSDKPassthroughMessage

/** https://discord.com/developers/docs/events/webhook-events#lobby-message-object-lobby-message-structure */
export interface DiscordSocialSDKLobbyMessage {
  /** ID of the message */
  id: string
  /** Type of message */
  type: MessageTypes
  /** Contents of the message */
  content: string
  /** ID of the lobby where the message was sent */
  lobby_id: string
  /** ID of the channel the message was sent in */
  channel_id: string
  /** Author of the message */
  author: DiscordUser
  /** Additional metadata for the message (key-value pairs) */
  metadata?: Record<string, unknown>
  /**
   * Message flags combined as a bitfield
   *
   * @see {@link MessageFlags}
   */
  flags: number
  /** ID of the application (only present during active Social SDK sessions) */
  application_id?: string
}

/** https://discord.com/developers/docs/events/webhook-events#message-object */
export interface DiscordSocialSDKMessage extends DiscordMessage {
  /** ID of the lobby where the message was created (only present in Linked Channel messages) */
  lobby_id?: string
  /** Channel object with recipient information */
  channel: DiscordChannel
}

/** https://discord.com/developers/docs/events/webhook-events#passthrough-message-object-passthrough-message-structure */
export interface DiscordSocialSDKPassthroughMessage {
  /** ID of the message */
  id: string
  /** Type of message */
  type: MessageTypes
  /** Contents of the message */
  content: string
  /** ID of the channel the message was sent in */
  channel_id: string
  /** ID of the message recipient */
  recipient_id: string
  /** Author of the message */
  author: DiscordUser
  /** Message flags combined as a bitfield
   *
   * @see {@link MessageFlags}
   */
  flags: MessageFlags
  /** ID of the application that created the message */
  application_id: string
  /** Channel object with recipient information */
  channel: DiscordChannel
}
