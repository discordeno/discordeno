let VERSION = "v7";

export const baseEndpoints = {
  /** Although, the version can be defaulted, keep the v6 as it can be changed to test newer versions when necessary. */
  BASE_URL: `https://discord.com/api/${VERSION}`,
  CDN_URL: "https://cdn.discordapp.com",
};

export function changeAPIVersion(number = 7) {
  VERSION = `v${number}`;
}

const GUILDS_BASE = (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}`;

export const endpoints = {
  GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,

  // Channel Endpoints
  CHANNEL: (id: string) => `${baseEndpoints.BASE_URL}/channels/${id}`,
  CHANNEL_MESSAGE: (id: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}`,
  CHANNEL_MESSAGES: (id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages`,
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
  CHANNEL_MESSAGE_REACTIONS: (id: string, messageID: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/reactions`,
  CHANNEL_MESSAGE_REACTION: (id: string, messageID: string, emoji: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${messageID}/reactions/${emoji}`,

  // Guild Endpoints
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
  GUILD_INTEGRATIONS: (id: string) => `${GUILDS_BASE(id)}/integrations`,
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

  // User endpoints
  USER_AVATAR: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/avatars/${id}/${icon}`,
  USER_DEFAULT_AVATAR: (icon: number) =>
    `${baseEndpoints.CDN_URL}/embed/avatars${icon}.png`,
  USER_CREATE_DM: `${baseEndpoints.BASE_URL}/users/@me/channels`,
};
