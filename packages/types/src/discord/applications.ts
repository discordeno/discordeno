/** Types for: https://discord.com/developers/docs/resources/application */

import type { DiscordGuild, DiscordTeam, DiscordUser, OAuth2Scope } from '../discord.js'
import type { DiscordWebhookEventType } from './webhookEvents.js'

/** https://discord.com/developers/docs/resources/application#application-object-application-structure */
export interface DiscordApplication {
  /** The name of the app */
  name: string
  /** The description of the app */
  description: string
  /** An array of rpc origin urls, if rpc is enabled */
  rpc_origins?: string[]
  /** The url of the app's terms of service */
  terms_of_service_url?: string
  /** The url of the app's privacy policy */
  privacy_policy_url?: string
  /** The hex encoded key for verification in interactions and the GameSDK's GetTicket */
  verify_key: string
  /** If this application is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists */
  primary_sku_id?: string
  /** If this application is a game sold on Discord, this field will be the URL slug that links to the store page */
  slug?: string
  /** The application's public flags */
  flags?: ApplicationFlags
  /** The id of the app */
  id: string
  /** The icon hash of the app */
  icon: string | null
  /** When false only app owner can join the app's bot to guilds */
  bot_public: boolean
  /** When true the app's bot will only join upon completion of the full oauth2 code grant flow */
  bot_require_code_grant: boolean
  /** Partial user object containing info on the owner of the application */
  owner?: Partial<DiscordUser>
  /** If the application belongs to a team, this will be a list of the members of that team */
  team: DiscordTeam | null
  /** Guild associated with the app. For example, a developer support server. */
  guild_id?: string
  /** A partial object of the associated guild */
  guild?: Partial<DiscordGuild>
  /** If this application is a game sold on Discord, this field will be the hash of the image on store embeds */
  cover_image?: string
  /** up to 5 tags describing the content and functionality of the application */
  tags?: string[]
  /** settings for the application's default in-app authorization link, if enabled */
  install_params?: DiscordInstallParams
  /** Default scopes and permissions for each supported installation context. */
  integration_types_config?: Partial<Record<`${DiscordApplicationIntegrationType}`, DiscordApplicationIntegrationTypeConfiguration>>
  /** the application's default custom authorization link, if enabled */
  custom_install_url?: string
  /** the application's role connection verification entry point, which when configured will render the app as a verification method in the guild role verification configuration */
  role_connections_verification_url?: string | null
  /** An approximate count of the app's guild membership. */
  approximate_guild_count?: number
  /** Approximate count of users that have installed the app. */
  approximate_user_install_count?: number
  /** Partial user object for the bot user associated with the app */
  bot?: Partial<DiscordUser>
  /** Array of redirect URIs for the app */
  redirect_uris?: string[]
  /** Interactions endpoint URL for the app */
  interactions_endpoint_url?: string | null
  /** Event webhook URL for the app to receive webhook events */
  event_webhooks_url?: string | null
  /** If webhook events are enabled for the app. 1 to disable, and 2 to enable. */
  event_webhooks_status: DiscordApplicationEventWebhookStatus
  /** List of Webhook event types the app subscribes to */
  event_webhooks_types?: DiscordWebhookEventType[]
}

/** https://discord.com/developers/docs/resources/application#application-object-application-integration-types */
export enum DiscordApplicationIntegrationType {
  /** App is installable to servers */
  GuildInstall = 0,
  /** App is installable to users */
  UserInstall = 1,
}

/** https://discord.com/developers/docs/resources/application#application-object-application-integration-type-configuration-object */
export interface DiscordApplicationIntegrationTypeConfiguration {
  /** Install params for each installation context's default in-app authorization link */
  oauth2_install_params?: DiscordInstallParams
}

/** https://discord.com/developers/docs/resources/application#application-object-application-event-webhook-status */
export enum DiscordApplicationEventWebhookStatus {
  /** Webhook events are disabled by developer */
  Disabled = 1,
  /** Webhook events are enabled by developer */
  Enabled = 2,
  /** Webhook events are disabled by Discord, usually due to inactivity */
  DisabledByDiscord = 3,
}

/** https://discord.com/developers/docs/resources/application#application-object-application-flags */
export enum ApplicationFlags {
  /** Indicates if an app uses the Auto Moderation API. */
  ApplicationAutoModerationRuleCreateBadge = 1 << 6,
  /** Intent required for bots in **100 or more servers** to receive 'presence_update' events */
  GatewayPresence = 1 << 12,
  /** Intent required for bots in under 100 servers to receive 'presence_update' events */
  GatewayPresenceLimited = 1 << 13,
  /** Intent required for bots in **100 or more servers** to receive member-related events like 'guild_member_add'. */
  GatewayGuildMembers = 1 << 14,
  /** Intent required for bots in under 100 servers to receive member-related events like 'guild_member_add'.  */
  GatewayGuildMembersLimited = 1 << 15,
  /** Indicates unusual growth of an app that prevents verification */
  VerificationPendingGuildLimit = 1 << 16,
  /** Indicates if an app is embedded within the Discord client (currently unavailable publicly) */
  Embedded = 1 << 17,
  /** Intent required for bots in **100 or more servers** to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055) */
  GatewayMessageContent = 1 << 18,
  /** Intent required for bots in under 100 servers to receive [message content](https://support-dev.discord.com/hc/en-us/articles/4404772028055), found in Bot Settings */
  GatewayMessageContentLimited = 1 << 19,
  /** Indicates if an app has registered global application commands */
  ApplicationCommandBadge = 1 << 23,
}

/** https://discord.com/developers/docs/resources/application#install-params-object-install-params-structure */
export interface DiscordInstallParams {
  /** Scopes to add the application to the server with */
  scopes: OAuth2Scope[]
  /** Permissions to request for the bot role */
  permissions: string
}

/** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-instance-object */
export interface DiscordActivityInstance {
  /** Application ID */
  application_id: string
  /** Activity Instance ID */
  instance_id: string
  /** Unique identifier for the launch */
  launch_id: string
  /** The Location the instance is runnning in */
  location: DiscordActivityLocation
  /** The IDs of the Users currently connected to the instance */
  users: string[]
}

/** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-location-object */
export interface DiscordActivityLocation {
  /** The unique identifier for the location */
  id: string
  /** Enum describing kind of location */
  kind: DiscordActivityLocationKind
  /** The id of the Channel */
  channel_id: string
  /** The id of the Guild */
  guild_id?: string | null
}

/** https://discord.com/developers/docs/resources/application#get-application-activity-instance-activity-location-kind-enum */
export enum DiscordActivityLocationKind {
  /** The Location is a Guild Channel */
  GuildChannel = 'gc',
  /** The Location is a Private Channel, such as a DM or GDM */
  PrivateChannel = 'pc',
}
