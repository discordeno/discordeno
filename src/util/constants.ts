/** https://discord.com/developers/docs/reference#api-reference-base-url */
export const BASE_URL = "https://discord.com/api";

/** https://discord.com/developers/docs/reference#api-versioning-api-versions */
export const API_VERSION = 8;

/** https://discord.com/developers/docs/topics/gateway#gateways-gateway-versions */
export const GATEWAY_VERSION = 8;

/** https://discord.com/developers/docs/reference#user-agent */
export const USER_AGENT =
  "DiscordBot (https://github.com/discordeno/discordeno, v10)";

/** https://discord.com/developers/docs/reference#image-formatting-image-base-url */
export const IMAGE_BASE_URL = "https://cdn.discordapp.com";

// This can be modified by big brain bots and use a proxy
export const baseEndpoints = {
  BASE_URL: `${BASE_URL}/v${API_VERSION}`,
  CDN_URL: IMAGE_BASE_URL,
};

const GUILDS_BASE = (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}`;

export const endpoints = {
  GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,

  // Channel Endpoints
  CHANNEL: (id: string) => `${baseEndpoints.BASE_URL}/channels/${id}`,
  CHANNEL_MESSAGE: (id: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}`,
  CHANNEL_MESSAGES: (id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages`,
  CHANNEL_PIN: (channelID: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/channels/${channelID}/pins/${messageID}`,
  CHANNEL_PINS: (id: string) => `${baseEndpoints.BASE_URL}/channels/${id}/pins`,
  CHANNEL_BULK_DELETE: (id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/bulk-delete`,
  CHANNEL_INVITES: (id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/invites`,
  CHANNEL_WEBHOOKS: (id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/webhooks`,
  CHANNEL_MESSAGE_REACTION_ME: (
    id: string,
    messageID: string,
    emoji: string,
  ) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/reactions/${emoji}/@me`,
  CHANNEL_MESSAGE_REACTION_USER: (
    id: string,
    messageID: string,
    emoji: string,
    userId: string,
  ) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/reactions/${emoji}/${userId}`,
  CHANNEL_MESSAGE_REACTIONS: (id: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/reactions`,
  CHANNEL_MESSAGE_REACTION: (id: string, messageID: string, emoji: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/reactions/${emoji}`,
  CHANNEL_FOLLOW: (id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/followers`,
  CHANNEL_MESSAGE_CROSSPOST: (id: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/crosspost`,

  // Guild Endpoints
  GUILDS: `${baseEndpoints.BASE_URL}/guilds`,
  GUILD: (id: string) => `${GUILDS_BASE(id)}`,
  GUILD_AUDIT_LOGS: (id: string) => `${GUILDS_BASE(id)}/audit-logs`,
  GUILD_BAN: (id: string, userID: string) =>
    `${GUILDS_BASE(id)}/bans/${userID}`,
  GUILD_BANS: (id: string) => `${GUILDS_BASE(id)}/bans`,
  GUILD_BANNER: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/banners/${id}/${icon}`,
  GUILD_CHANNELS: (id: string) => `${GUILDS_BASE(id)}/channels`,
  GUILD_CHANNEL: (id: string) => `${baseEndpoints.BASE_URL}/channels/${id}`,
  GUILD_EMBED: (id: string) => `${GUILDS_BASE(id)}/widget`,
  GUILD_EMOJI: (id: string, emoji_id: string) =>
    `${GUILDS_BASE(id)}/emojis/${emoji_id}`,
  GUILD_EMOJIS: (id: string) => `${GUILDS_BASE(id)}/emojis`,
  GUILD_ICON: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/icons/${id}/${icon}`,
  GUILD_INTEGRATION: (id: string, integrationID: string) =>
    `${GUILDS_BASE(id)}/integrations/${integrationID}`,
  GUILD_INTEGRATION_SYNC: (id: string, integrationID: string) =>
    `${GUILDS_BASE(id)}/integrations/${integrationID}/sync`,
  GUILD_INTEGRATIONS: (id: string) =>
    `${GUILDS_BASE(id)}/integrations?include_applications=true`,
  GUILD_INVITES: (id: string) => `${GUILDS_BASE(id)}/invites`,
  GUILD_LEAVE: (id: string) =>
    `${baseEndpoints.BASE_URL}/users/@me/guilds/${id}`,
  GUILD_MEMBER: (id: string, memberID: string) =>
    `${GUILDS_BASE(id)}/members/${memberID}`,
  GUILD_MEMBER_ROLE: (id: string, memberID: string, roleID: string) =>
    `${GUILDS_BASE(id)}/members/${memberID}/roles/${roleID}`,
  GUILD_PRUNE: (id: string) => `${GUILDS_BASE(id)}/prune`,
  GUILD_REGIONS: (id: string) => `${GUILDS_BASE(id)}/regions`,
  GUILD_ROLE: (id: string, roleID: string) =>
    `${GUILDS_BASE(id)}/roles/${roleID}`,
  GUILD_ROLES: (id: string) => `${GUILDS_BASE(id)}/roles`,
  GUILD_SPLASH: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/splashes/${id}/${icon}`,
  GUILD_VANITY_URL: (id: string) => `${GUILDS_BASE(id)}/vanity-url`,
  GUILD_WEBHOOKS: (id: string) => `${GUILDS_BASE(id)}/webhooks`,
  GUILD_TEMPLATE: (code: string) =>
    `${baseEndpoints.BASE_URL}/guilds/templates/${code}`,
  GUILD_TEMPLATES: (id: string) => `${GUILDS_BASE(id)}/templates`,
  GUILD_MEMBER_VERIFICATION: (guildID: string) =>
    `${GUILDS_BASE(guildID)}/member-verification`,
  GUILD_WELCOME_SCREEN: (guildID: string) =>
    `${GUILDS_BASE(guildID)}/welcome-screen`,

  WEBHOOK: (id: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${id}/${token}`,
  WEBHOOK_ID: (id: string) => `${baseEndpoints.BASE_URL}/webhooks/${id}`,
  WEBHOOK_EDIT: (id: string, token: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${id}/${token}/messages/${messageID}`,
  WEBHOOK_DELETE: (id: string, token: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${id}/${token}/messages/${messageID}`,

  // Application Endpoints
  COMMANDS: (botID: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/commands`,
  COMMANDS_GUILD: (botID: string, id: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/guilds/${id}/commands`,
  COMMANDS_ID: (botID: string, id: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/commands/${id}`,
  COMMANDS_GUILD_ID: (botID: string, id: string, guildID: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/guilds/${guildID}/commands/${id}`,

  // Interaction Endpoints
  INTERACTION_ID_TOKEN: (id: string, token: string) =>
    `${baseEndpoints.BASE_URL}/interactions/${id}/${token}/callback`,
  INTERACTION_ORIGINAL_ID_TOKEN: (id: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${id}/${token}/messages/@original`,
  INTERACTION_ID_TOKEN_MESSAGEID: (
    id: string,
    token: string,
    messageID: string,
  ) =>
    `${baseEndpoints.BASE_URL}/webhooks/${id}/${token}/messages/${messageID}`,

  // User endpoints
  USER: (id: string) => `${baseEndpoints.BASE_URL}/users/${id}`,
  USER_BOT: `${baseEndpoints.BASE_URL}/users/@me`,
  USER_AVATAR: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/avatars/${id}/${icon}`,
  USER_DEFAULT_AVATAR: (icon: number) =>
    `${baseEndpoints.CDN_URL}/embed/avatars${icon}.png`,
  USER_CREATE_DM: `${baseEndpoints.BASE_URL}/users/@me/channels`,
};
