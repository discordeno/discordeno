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

const GUILDS_BASE = (guildId: string) =>
  `${baseEndpoints.BASE_URL}/guilds/${guildId}`;
const CHANNEL_BASE = (channelId: string) =>
  `${baseEndpoints.BASE_URL}/channels/${channelId}`;

export const endpoints = {
  GUILDS_BASE,
  CHANNEL_BASE,

  GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,

  // Channel Endpoints
  CHANNEL_MESSAGE: (channelId: string, messageId: string) =>
    `${CHANNEL_BASE(channelId)}/messages/${messageId}`,
  CHANNEL_MESSAGES: (channelId: string) =>
    `${CHANNEL_BASE(channelId)}/messages`,
  CHANNEL_PIN: (channelId: string, messageId: string) =>
    `${CHANNEL_BASE(channelId)}/pins/${messageId}`,
  CHANNEL_PINS: (channelId: string) => `${CHANNEL_BASE(channelId)}/pins`,
  CHANNEL_BULK_DELETE: (channelId: string) =>
    `${CHANNEL_BASE(channelId)}/messages/bulk-delete`,
  CHANNEL_INVITES: (channelId: string) => `${CHANNEL_BASE(channelId)}/invites`,
  CHANNEL_WEBHOOKS: (channelId: string) =>
    `${CHANNEL_BASE(channelId)}/webhooks`,
  CHANNEL_MESSAGE_REACTION_ME: (
    channelId: string,
    messageId: string,
    emoji: string,
  ) =>
    `${CHANNEL_BASE(channelId)}/messages/${messageId}/reactions/${emoji}/@me`,
  CHANNEL_MESSAGE_REACTION_USER: (
    channelId: string,
    messageId: string,
    emoji: string,
    userId: string,
  ) =>
    `${
      CHANNEL_BASE(channelId)
    }/messages/${messageId}/reactions/${emoji}/${userId}`,
  CHANNEL_MESSAGE_REACTIONS: (channelId: string, messageId: string) =>
    `${CHANNEL_BASE(channelId)}/messages/${messageId}/reactions`,
  CHANNEL_MESSAGE_REACTION: (
    channelId: string,
    messageId: string,
    emoji: string,
  ) => `${CHANNEL_BASE(channelId)}/messages/${messageId}/reactions/${emoji}`,
  CHANNEL_FOLLOW: (channelId: string) => `${CHANNEL_BASE(channelId)}/followers`,
  CHANNEL_MESSAGE_CROSSPOST: (channelId: string, messageId: string) =>
    `${CHANNEL_BASE(channelId)}/messages/${messageId}/crosspost`,
  CHANNEL_OVERWRITE: (channelId: string, overwriteId: string) =>
    `${CHANNEL_BASE(channelId)}/permissions/${overwriteId}`,
  // Bots SHALL NOT use this endpoint but they can
  CHANNEL_TYPING: (channelId: string) => `${CHANNEL_BASE(channelId)}/typing`,

  // Guild Endpoints
  GUILDS: `${baseEndpoints.BASE_URL}/guilds`,
  GUILD_AUDIT_LOGS: (guildId: string) => `${GUILDS_BASE(guildId)}/audit-logs`,
  GUILD_BAN: (guildId: string, userId: string) =>
    `${GUILDS_BASE(guildId)}/bans/${userId}`,
  GUILD_BANS: (guildId: string) => `${GUILDS_BASE(guildId)}/bans`,
  GUILD_BANNER: (guildId: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/banners/${guildId}/${icon}`,
  GUILD_CHANNELS: (guildId: string) => `${GUILDS_BASE(guildId)}/channels`,
  GUILD_WIDGET: (guildId: string) => `${GUILDS_BASE(guildId)}/widget`,
  GUILD_EMOJI: (guildId: string, emojiId: string) =>
    `${GUILDS_BASE(guildId)}/emojis/${emojiId}`,
  GUILD_EMOJIS: (guildId: string) => `${GUILDS_BASE(guildId)}/emojis`,
  GUILD_ICON: (guildId: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/icons/${guildId}/${icon}`,
  GUILD_INTEGRATION: (guildId: string, integrationId: string) =>
    `${GUILDS_BASE(guildId)}/integrations/${integrationId}`,
  GUILD_INTEGRATION_SYNC: (guildId: string, integrationId: string) =>
    `${GUILDS_BASE(guildId)}/integrations/${integrationId}/sync`,
  GUILD_INTEGRATIONS: (guildId: string) =>
    `${GUILDS_BASE(guildId)}/integrations?include_applications=true`,
  GUILD_INVITES: (guildId: string) => `${GUILDS_BASE(guildId)}/invites`,
  GUILD_LEAVE: (guildId: string) =>
    `${baseEndpoints.BASE_URL}/users/@me/guilds/${guildId}`,
  GUILD_MEMBER: (guildId: string, userId: string) =>
    `${GUILDS_BASE(guildId)}/members/${userId}`,
  GUILD_MEMBERS: (guildId: string) => `${GUILDS_BASE(guildId)}/members`,
  GUILD_MEMBER_ROLE: (guildId: string, memberId: string, roleId: string) =>
    `${GUILDS_BASE(guildId)}/members/${memberId}/roles/${roleId}`,
  GUILD_PRUNE: (guildId: string) => `${GUILDS_BASE(guildId)}/prune`,
  GUILD_REGIONS: (guildId: string) => `${GUILDS_BASE(guildId)}/regions`,
  GUILD_ROLE: (guildId: string, roleId: string) =>
    `${GUILDS_BASE(guildId)}/roles/${roleId}`,
  GUILD_ROLES: (guildId: string) => `${GUILDS_BASE(guildId)}/roles`,
  GUILD_SPLASH: (guildId: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/splashes/${guildId}/${icon}`,
  GUILD_VANITY_URL: (guildId: string) => `${GUILDS_BASE(guildId)}/vanity-url`,
  GUILD_WEBHOOKS: (guildId: string) => `${GUILDS_BASE(guildId)}/webhooks`,
  GUILD_TEMPLATE: (code: string) =>
    `${baseEndpoints.BASE_URL}/guilds/templates/${code}`,
  GUILD_TEMPLATES: (guildId: string) => `${GUILDS_BASE(guildId)}/templates`,
  GUILD_PREVIEW: (guildId: string) => `${GUILDS_BASE(guildId)}/preview`,

  // Voice
  VOICE_REGIONS: `${baseEndpoints.BASE_URL}/voice/regions`,

  INVITE: (inviteCode: string) =>
    `${baseEndpoints.BASE_URL}/invites/${inviteCode}`,

  WEBHOOK: (webhookId: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookId}/${token}`,
  WEBHOOK_ID: (webhookId: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookId}`,
  WEBHOOK_MESSAGE: (webhookId: string, token: string, messageId: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookId}/${token}/messages/${messageId}`,
  WEBHOOK_SLACK: (webhookId: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookId}/${token}/slack`,
  WEBHOOK_GITHUB: (webhookId: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${webhookId}/${token}/github`,

  // Application Endpoints
  COMMANDS: (applicationId: string) =>
    `${baseEndpoints.BASE_URL}/applications/${applicationId}/commands`,
  COMMANDS_GUILD: (applicationId: string, guildId: string) =>
    `${baseEndpoints.BASE_URL}/applications/${applicationId}/guilds/${guildId}/commands`,
  COMMANDS_ID: (applicationId: string, commandId: string) =>
    `${baseEndpoints.BASE_URL}/applications/${applicationId}/commands/${commandId}`,
  COMMANDS_GUILD_ID: (
    applicationId: string,
    guildId: string,
    commandId: string,
  ) =>
    `${baseEndpoints.BASE_URL}/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,

  // Interaction Endpoints
  INTERACTION_ID_TOKEN: (interactionId: string, token: string) =>
    `${baseEndpoints.BASE_URL}/interactions/${interactionId}/${token}/callback`,
  INTERACTION_ORIGINAL_Id_TOKEN: (interactionId: string, token: string) =>
    `${baseEndpoints.BASE_URL}/webhooks/${interactionId}/${token}/messages/@original`,
  INTERACTION_Id_TOKEN_MESSAGEId: (
    applicationId: string,
    token: string,
    messageId: string,
  ) =>
    `${baseEndpoints.BASE_URL}/webhooks/${applicationId}/${token}/messages/${messageId}`,

  // User endpoints
  USER: (userId: string) => `${baseEndpoints.BASE_URL}/users/${userId}`,
  USER_BOT: `${baseEndpoints.BASE_URL}/users/@me`,
  USER_GUILDS: `${baseEndpoints.BASE_URL}/@me/guilds`,
  USER_AVATAR: (userId: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/avatars/${userId}/${icon}`,
  USER_DEFAULT_AVATAR: (icon: number) =>
    `${baseEndpoints.CDN_URL}/embed/avatars/${icon}.png`,
  USER_DM: `${baseEndpoints.BASE_URL}/users/@me/channels`,
  USER_CONNECTIONS: `${baseEndpoints.BASE_URL}/users/@me/connections`,
  USER_NICK: (guildId: string) => `${GUILDS_BASE(guildId)}/members/@me/nick`,

  // oAuth2
  OAUTH2_APPLICATION: `${baseEndpoints.BASE_URL}/oauth2/applications/@me`,
};

export const SLASH_COMMANDS_NAME_REGEX = /^[\w-]{1,32}$/;
