export enum DiscordOAuth2Scopes {
  /** for oauth2 bots, this puts the bot in the user's selected guild by default */
  bot = "bot",
  /** allows /users/@me/connections to return linked third-party accounts */
  connections = "connections",
  /** enables /users/@me to return an email */
  email = "email",
  /** allows /users/@me without email */
  identify = "identify",
  /** allows /users/@me/guilds to return basic information about all of a user's guilds */
  guilds = "guilds",
  /** allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild */
  "guilds.join" = "guilds.join",
  /** allows your app to join users to a group dm */
  "gdm.join" = "gdm.join",
  /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
  "messages.read" = "messages.read",
  /** for local rpc server access, this allows you to control a user's local Discord client - whitelist only */
  rpc = "rpc",
  /** for local rpc server api access, this allows you to access the API as the local user - whitelist only */
  "rpc.api" = "rpc.api",
  /** for local rpc server api access, this allows you to receive notifications pushed out to the user - whitelist only */
  "rpc.notifications.read" = "rpc.notifications.read",
  /** this generates a webhook that is returned in the oauth token response for authorization code grants */
  "webhook.incoming" = "webhook.incoming",
  /** allows your app to upload/update builds for a user's applications - whitelist only */
  "applications.builds.upload" = "applications.builds.upload",
  /** allows your app to read build data for a user's applications */
  "applications.builds.read" = "applications.builds.read",
  /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
  "applications.store.update" = "applications.store.update",
  /** allows your app to read entitlements for a user's applications */
  "applications.entitlements" = "applications.entitlements",
  /** allows your app to know a user's friends and implicit relationships - whitelist only */
  "relationships.read" = "relationships.read",
  /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - whitelist only */
  "activities.read" = "activities.read",
  /** allows your app to update a user's activity - whitelist only (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER) */
  "activities.write" = "activities.write",
  /** allows your app to use Slash Commands in a guild */
  "applications.commands" = "applications.commands",
  /** allows your app to update its Slash Commands via this bearer token - client credentials grant only */
  "applications.commands.update" = "applications.commands.update",
}
