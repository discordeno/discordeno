/** Types for: https://discord.com/developers/docs/topics/oauth2 */

import type { DiscordApplication } from './application.js'
import type { DiscordGuild } from './guild.js'
import type { DiscordUser } from './user.js'
import type { DiscordWebhook } from './webhook.js'

/** https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes */
export enum OAuth2Scope {
  /**
   * Allows your app to fetch data from a user's "Now Playing/Recently Played" list
   *
   * @remarks
   * This scope is not currently available for apps
   */
  ActivitiesRead = 'activities.read',
  /**
   * Allows your app to update a user's activity
   *
   * @remarks
   * This scope not currently available for apps.
   */
  ActivitiesWrite = 'activities.write',
  /** Allows your app to read build data for a user's applications */
  ApplicationsBuildsRead = 'applications.builds.read',
  /**
   * Allows your app to upload/update builds for a user's applications
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  ApplicationsBuildsUpload = 'applications.builds.upload',
  /** Allows your app to add commands to a guild - included by default with the `bot` scope */
  ApplicationsCommands = 'applications.commands',
  /**
   * Allows your app to update its Application Commands via this bearer token
   *
   * @remarks
   * This scope can only be used when using a [Client Credential Grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant)
   */
  ApplicationsCommandsUpdate = 'applications.commands.update',
  /** Allows your app to update permissions for its commands in a guild a user has permissions to */
  ApplicationCommandsPermissionsUpdate = 'applications.commands.permissions.update',
  /** Allows your app to read entitlements for a user's applications */
  ApplicationsEntitlements = 'applications.entitlements',
  /** Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
  ApplicationsStoreUpdate = 'applications.store.update',
  /** For oauth2 bots, this puts the bot in the user's selected guild by default */
  Bot = 'bot',
  /** Allows requests to [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) */
  Connections = 'connections',
  /**
   * Allows your app to see information about the user's DMs and group DMs
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  DMChannelsRead = 'dm_channels.read',
  /** Adds the `email` filed to [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) */
  Email = 'email',
  /** Allows your app to join users to a group dm */
  GroupDMJoins = 'gdm.join',
  /** Allows requests to [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) */
  Guilds = 'guilds',
  /** Allows requests to [/guilds/{guild.id}/members/{user.id}](https://discord.com/developers/docs/resources/guild#add-guild-member) */
  GuildsJoin = 'guilds.join',
  /** Allows requests to [/users/@me/guilds/{guild.id}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) */
  GuildsMembersRead = 'guilds.members.read',
  /**
   * Allows requests to [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user)
   *
   * @remarks
   * The return object from [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user)
   * does NOT contain the `email` field unless the scope `email` is also used
   */
  Identify = 'identify',
  /**
   * For local rpc server api access, this allows you to read messages from all client channels
   * (otherwise restricted to channels/guilds your app creates)
   */
  MessagesRead = 'messages.read',
  /**
   * Allows your app to know a user's friends and implicit relationships
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RelationshipsRead = 'relationships.read',
  /** Allows your app to update a user's connection and metadata for the app */
  RoleConnectionsWrite = 'role_connections.write',
  /**
   * For local rpc server access, this allows you to control a user's local Discord client
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPC = 'rpc',
  /**
   * For local rpc server access, this allows you to update a user's activity
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCActivitiesWrite = 'rpc.activities.write',
  /**
   * For local rpc server api access, this allows you to receive notifications pushed out to the user
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCNotificationsRead = 'rpc.notifications.read',
  /**
   * For local rpc server access, this allows you to read a user's voice settings and listen for voice events
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCVoiceRead = 'rpc.voice.read',
  /**
   * For local rpc server access, this allows you to update a user's voice settings
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  RPCVoiceWrite = 'rpc.voice.write',
  /**
   * Allows your app to connect to voice on user's behalf and see all the voice members
   *
   * @remarks
   * This scope requires Discord approval to be used
   */
  Voice = 'voice',
  /** Generate a webhook that is returned in the oauth token response for authorization code grants */
  WebhookIncoming = 'webhook.incoming',
}

/** https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-redirect-url-example */
export interface DiscordTokenExchangeAuthorizationCode {
  grant_type: 'authorization_code'
  /** The code for the token exchange */
  code: string
  /** The redirect_uri associated with this authorization */
  redirect_uri: string
  /** The code verifier for the token exchange if one was sent during the authorization request */
  code_verifier: string
}

/** https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-access-token-response */
export interface DiscordAccessTokenResponse {
  /** The access token of the user */
  access_token: string
  /** The type of token */
  token_type: string
  /** The number of seconds after that the access token is expired */
  expires_in: number
  /**
   * The refresh token to refresh the access token
   *
   * @remarks
   * When the token exchange is a client credentials type grant this value is not defined.
   */
  refresh_token: string
  /** The scopes for the access token */
  scope: string
  /** The webhook the user created for the application. Requires the `webhook.incoming` scope */
  webhook?: DiscordWebhook
  /** The guild the bot has been added. Requires the `bot` scope */
  guild?: DiscordGuild
}

/**
 * https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
 * https://discord.com/developers/docs/topics/oauth2#client-credentials-grant
 */
export type DiscordTokenExchange = DiscordTokenExchangeAuthorizationCode | DiscordTokenExchangeRefreshToken | DiscordTokenExchangeClientCredentials

/** https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example */
export interface DiscordTokenExchangeRefreshToken {
  grant_type: 'refresh_token'
  /** the user's refresh token */
  refresh_token: string
}

/** https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-token-revocation-example */
export interface DiscordTokenRevocation {
  /** The access token to revoke */
  token: string
  /** Optional, the type of token you are using for the revocation */
  token_type_hint?: 'access_token' | 'refresh_token'
}

/** https://discord.com/developers/docs/topics/oauth2#client-credentials-grant */
export interface DiscordTokenExchangeClientCredentials {
  grant_type: 'client_credentials'
  /** The scope(s) for the access token */
  scope: OAuth2Scope[]
}

/** https://discord.com/developers/docs/topics/oauth2#get-current-authorization-information-response-structure */
export interface DiscordCurrentAuthorization {
  application: DiscordApplication
  /** the scopes the user has authorized the application for */
  scopes: OAuth2Scope[]
  /** when the access token expires */
  expires: string
  /** the user who has authorized, if the user has authorized with the `identify` scope */
  user?: DiscordUser
}
