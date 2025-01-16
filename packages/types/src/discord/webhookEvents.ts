/** Types for: https://discord.com/developers/docs/events/webhook-events */

import type { DiscordEntitlement, DiscordGuild, DiscordUser, OAuth2Scope } from '../discord.js'
import type { DiscordApplicationIntegrationType } from './applications.js'

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
  data?: DiscordEventWebhookApplicationAuthorizedBody | DiscordEntitlement
}

/** https://discord.com/developers/docs/events/webhook-events#event-types */
export enum DiscordWebhookEventType {
  /** Sent when an app was authorized by a user to a server or their account */
  ApplicationAuthorized = 'APPLICATION_AUTHORIZED',
  /** Entitlement was created */
  EntitlementCreate = 'ENTITLEMENT_CREATE',
  /** User was added to a Quest (currently unavailable) */
  QuestUserEnrollment = 'QUEST_USER_ENROLLMENT',
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
