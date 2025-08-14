/** Types for: https://discord.com/developers/docs/resources/application */

import type {
  ApplicationFlags,
  DiscordApplicationEventWebhookStatus,
  DiscordApplicationIntegrationType,
  DiscordInstallParams,
} from '../discord/application.js'
import type { DiscordWebhookEventType } from '../discord/webhookEvents.js'

// TODO: Do we want to move the "All parameters to this endpoint are optional" of this to the rest manager itself?
/** https://discord.com/developers/docs/resources/application#edit-current-application-json-params */
export interface EditApplication {
  /** Default custom authorization URL for the app, if enabled */
  customInstallUrl?: string
  /** Description of the app */
  description?: string
  /** Role connection verification URL for the app */
  roleConnectionsVerificationUrl?: string
  /** Settings for the app's default in-app authorization link, if enabled */
  installParams?: DiscordInstallParams
  /** Default scopes and permissions for each supported installation context. */
  integrationTypesConfig?: DiscordApplicationIntegrationType
  /**
   * App's public flags
   *
   * @remarks
   * Only limited intent flags (`GATEWAY_PRESENCE_LIMITED`, `GATEWAY_GUILD_MEMBERS_LIMITED`, and `GATEWAY_MESSAGE_CONTENT_LIMITED`) can be updated via the API.
   */
  flags?: ApplicationFlags
  /** Icon for the app */
  icon?: string | null
  /** Default rich presence invite cover image for the app */
  coverImage?: string | null
  /**
   * Interactions endpoint URL for the app
   *
   * @remarks
   * To update an Interactions endpoint URL via the API, the URL must be valid
   */
  interactionEndpointUrl?: string
  /**
   * List of tags describing the content and functionality of the app (max of 20 characters per tag)
   *
   * @remarks
   * There can only be a max of 5 tags
   */
  tags?: string[]
  /** Event webhook URL for the app to receive webhook events */
  eventWebhooksUrl?: string
  /** If webhook events are enabled for the app. 1 to disable, and 2 to enable. */
  eventWebhooksStatus: DiscordApplicationEventWebhookStatus
  /** List of Webhook event types the app subscribes to */
  eventWebhooksTypes?: DiscordWebhookEventType[]
}
