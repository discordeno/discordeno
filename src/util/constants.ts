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

const GUILDS_BASE = (guildID: string) =>
  `${baseEndpoints.BASE_URL}/guilds/${guildID}`;
const CHANNEL_BASE = (channelID: string) =>
  `${baseEndpoints.BASE_URL}/channels/${channelID}`;

export const endpoints = {
  GUILDS_BASE,
  CHANNEL_BASE,

  GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,

  // Channel Endpoints
  CHANNEL_MESSAGE: (channelID: string, messageID: string) =>
    `${CHANNEL_BASE(channelID)}/messages/${messageID}`,
  CHANNEL_MESSAGES: (channelID: string) =>
    `${CHANNEL_BASE(channelID)}/messages`,
  CHANNEL_PIN: (channelID: string, messageID: string) =>
    `${CHANNEL_BASE(channelID)}/pins/${messageID}`,
  CHANNEL_PINS: (channelID: string) => `${CHANNEL_BASE(channelID)}/pins`,
  CHANNEL_BULK_DELETE: (channelID: string) =>
    `${CHANNEL_BASE(channelID)}/messages/bulk-delete`,
  CHANNEL_INVITES: (channelID: string) => `${CHANNEL_BASE(channelID)}/invites`,
  CHANNEL_WEBHOOKS: (channelID: string) =>
    `${CHANNEL_BASE(channelID)}/webhooks`,
  CHANNEL_MESSAGE_REACTION_ME: (
    channelID: string,
    messageID: string,
    emoji: string,
  ) =>
    `${CHANNEL_BASE(channelID)}/messages/${messageID}/reactions/${emoji}/@me`,
  CHANNEL_MESSAGE_REACTION_USER: (
    channelID: string,
    messageID: string,
    emoji: string,
    userId: string,
  ) =>
    `${
      CHANNEL_BASE(channelID)
    }/messages/${messageID}/reactions/${emoji}/${userId}`,
  CHANNEL_MESSAGE_REACTIONS: (channelID: string, messageID: string) =>
    `${CHANNEL_BASE(channelID)}/messages/${messageID}/reactions`,
  CHANNEL_MESSAGE_REACTION: (
    channelID: string,
    messageID: string,
    emoji: string,
  ) => `${CHANNEL_BASE(channelID)}/messages/${messageID}/reactions/${emoji}`,
  CHANNEL_FOLLOW: (channelID: string) => `${CHANNEL_BASE(channelID)}/followers`,
  CHANNEL_MESSAGE_CROSSPOST: (channelID: string, messageID: string) =>
    `${CHANNEL_BASE(channelID)}/messages/${messageID}/crosspost`,
  CHANNEL_OVERWRITE: (channelID: string, overwriteID: string) =>
    `${CHANNEL_BASE(channelID)}/permissions/${overwriteID}`,
  // Bots SHALL NOT use this endpoint but they can
  CHANNEL_TYPING: (channelID: string) => `${CHANNEL_BASE(channelID)}/typing`,

  // Guild Endpoints
  GUILDS: `${baseEndpoints.BASE_URL}/guilds`,
  GUILD_AUDIT_LOGS: (guildID: string) => `${GUILDS_BASE(guildID)}/audit-logs`,
  GUILD_BAN: (guildID: string, userID: string) =>
    `${GUILDS_BASE(guildID)}/bans/${userID}`,
  GUILD_BANS: (guildID: string) => `${GUILDS_BASE(guildID)}/bans`,
  GUILD_BANNER: (guildID: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/banners/${guildID}/${icon}`,
  GUILD_CHANNELS: (guildID: string) => `${GUILDS_BASE(guildID)}/channels`,
  GUILD_WIDGET: (guildID: string) => `${GUILDS_BASE(guildID)}/widget`,
  GUILD_EMOJI: (guildID: string, emojiID: string) =>
    `${GUILDS_BASE(guildID)}/emojis/${emojiID}`,
  GUILD_EMOJIS: (guildID: string) => `${GUILDS_BASE(guildID)}/emojis`,
  GUILD_ICON: (guildID: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/icons/${guildID}/${icon}`,
  GUILD_INTEGRATION: (guildID: string, integrationID: string) =>
    `${GUILDS_BASE(guildID)}/integrations/${integrationID}`,
  GUILD_INTEGRATION_SYNC: (guildID: string, integrationID: string) =>
    `${GUILDS_BASE(guildID)}/integrations/${integrationID}/sync`,
  GUILD_INTEGRATIONS: (guildID: string) =>
    `${GUILDS_BASE(guildID)}/integrations?include_applications=true`,
  GUILD_INTEGRATION_CREATE: (guildID: string) =>
    `${GUILDS_BASE(guildID)}/integrations`,
  GUILD_INVITES: (guildID: string) => `${GUILDS_BASE(guildID)}/invites`,
  GUILD_LEAVE: (guildID: string) =>
    `${baseEndpoints.BASE_URL}/users/@me/guilds/${guildID}`,
  GUILD_MEMBER: (guildID: string, userID: string) =>
    `${GUILDS_BASE(guildID)}/members/${userID}`,
  GUILD_MEMBERS: (guildID: string) => `${GUILDS_BASE(guildID)}/members`,
  GUILD_MEMBER_ROLE: (guildID: string, memberID: string, roleID: string) =>
    `${GUILDS_BASE(guildID)}/members/${memberID}/roles/${roleID}`,
  GUILD_PRUNE: (guildID: string) => `${GUILDS_BASE(guildID)}/prune`,
  GUILD_REGIONS: (guildID: string) => `${GUILDS_BASE(guildID)}/regions`,
  GUILD_ROLE: (guildID: string, roleID: string) =>
    `${GUILDS_BASE(guildID)}/roles/${roleID}`,
  GUILD_ROLES: (guildID: string) => `${GUILDS_BASE(guildID)}/roles`,
  GUILD_SPLASH: (guildID: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/splashes/${guildID}/${icon}`,
  GUILD_VANITY_URL: (guildID: string) => `${GUILDS_BASE(guildID)}/vanity-url`,
  GUILD_WEBHOOKS: (guildID: string) => `${GUILDS_BASE(guildID)}/webhooks`,
  GUILD_TEMPLATE: (code: string) =>
    `${baseEndpoints.BASE_URL}/guilds/templates/${code}`,
  GUILD_TEMPLATES: (guildID: string) => `${GUILDS_BASE(guildID)}/templates`,
  GUILD_PREVIEW: (guildID: string) => `${GUILDS_BASE(guildID)}/preview`,

  INVITE: (inviteCode: string) =>
    `${baseEndpoints.BASE_URL}/invites/${inviteCode}`,

  WEBHOOK: (webhookID: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookID}/${token}`,
  WEBHOOK_ID: (webhookID: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookID}`,
  WEBHOOK_MESSAGE: (webhookID: string, token: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookID}/${token}/messages/${messageID}`,
  WEBHOOK_SLACK: (webhookID: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookID}/${token}/slack`,
  WEBHOOK_GITHUB: (webhookID: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookID}/${token}/github`,

  // Application Endpoints
  COMMANDS: (botID: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/commands`,
  COMMANDS_GUILD: (botID: string, guildID: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/guilds/${guildID}/commands`,
  COMMANDS_ID: (botID: string, commandID: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/commands/${commandID}`,
  COMMANDS_GUILD_ID: (botID: string, commandID: string, guildID: string) =>
    `${baseEndpoints.BASE_URL}/applications/${botID}/guilds/${guildID}/commands/${commandID}`,

  // Interaction Endpoints
  INTERACTION_ID_TOKEN: (interactionID: string, token: string) =>
    `${baseEndpoints.BASE_URL}/interactions/${interactionID}/${token}/callback`,
  INTERACTION_ORIGINAL_ID_TOKEN: (interactionID: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${interactionID}/${token}/messages/@original`,
  INTERACTION_ID_TOKEN_MESSAGEID: (
    applicationID: string,
    token: string,
    messageID: string,
  ) =>
    `${baseEndpoints.BASE_URL}/webhooks/${applicationID}/${token}/messages/${messageID}`,

  // User endpoints
  USER: (userID: string) => `${baseEndpoints.BASE_URL}/users/${userID}`,
  USER_BOT: `${baseEndpoints.BASE_URL}/users/@me`,
  USER_GUILDS: `${baseEndpoints.BASE_URL}/@me/guilds`,
  USER_AVATAR: (userID: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/avatars/${userID}/${icon}`,
  USER_DEFAULT_AVATAR: (icon: number) =>
    `${baseEndpoints.CDN_URL}/embed/avatars/${icon}.png`,
  USER_DM: `${baseEndpoints.BASE_URL}/users/@me/channels`,
  USER_CONNECTIONS: `${baseEndpoints.BASE_URL}/users/@me/connections`,
  USER_NICK: (guildID: string) => `${GUILDS_BASE(guildID)}/members/@me/nick`,
};
