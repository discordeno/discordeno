export const baseEndpoints = {
  /** Although, the version can be defaulted, keep the v6 as it can be changed to test newer versions when necessary. */
  BASE_URL: "https://discordapp.com/api/v6",
  CDN_URL: "https://cdn.discordapp.com",
};

const GUILDS_BASE = (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}`;

export const endpoints = {
  GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,

  // Channel Endpoints
  CHANNEL_MESSAGE: (id: string, message_id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${message_id}`,
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
    message_id: string,
    emoji: string,
  ) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${message_id}/reactions/${emoji}/@me`,
  CHANNEL_MESSAGE_REACTIONS: (id: string, message_id: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${message_id}/reactions`,
  CHANNEL_MESSAGE_REACTION: (id: string, message_id: string, emoji: string) =>
    `${baseEndpoints.BASE_URL}/channels/${id}/messages/${message_id}/reactions/${emoji}`,

  // Guild Endpoints
  GUILD: (id: string) => `${GUILDS_BASE(id)}`,
  GUILD_AUDIT_LOGS: (id: string) => `${GUILDS_BASE(id)}/audit-logs`,
  GUILD_BAN: (id: string, user_id: string) =>
    `${GUILDS_BASE(id)}/bans/${user_id}`,
  GUILD_BANS: (id: string) => `${GUILDS_BASE(id)}/bans`,
  GUILD_BANNER: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/banners/${id}/${icon}`,
  GUILD_CHANNELS: (id: string) => `${GUILDS_BASE(id)}/channels`,
  GUILD_EMBED: (id: string) => `${GUILDS_BASE(id)}/embed`,
  GUILD_EMOJI: (id: string, emoji_id: string) =>
    `${GUILDS_BASE(id)}/emojis/${emoji_id}`,
  GUILD_EMOJIS: (id: string) => `${GUILDS_BASE(id)}/emojis`,
  GUILD_ICON: (id: string, icon: string) =>
    `${baseEndpoints.CDN_URL}/icons/${id}/${icon}`,
  GUILD_INTEGRATION: (id: string, integration_id: string) =>
    `${GUILDS_BASE(id)}/integrations/${integration_id}`,
  GUILD_INTEGRATION_SYNC: (id: string, integration_id: string) =>
    `${GUILDS_BASE(id)}/integrations/${integration_id}/sync`,
  GUILD_INTEGRATIONS: (id: string) => `${GUILDS_BASE(id)}/integrations`,
  GUILD_INVITES: (id: string) => `${GUILDS_BASE(id)}/invites`,
  GUILD_LEAVE: (id: string) =>
    `${baseEndpoints.BASE_URL}/users/@me/guilds/${id}`,
  GUILD_MEMBER: (id: string, member_id: string) =>
    `${GUILDS_BASE(id)}/members/${member_id}`,
  GUILD_MEMBER_ROLE: (id: string, member_id: string, role_id: string) =>
    `${GUILDS_BASE(id)}/members/${member_id}/roles/${role_id}`,
  GUILD_PRUNE: (id: string) => `${GUILDS_BASE(id)}/prune`,
  GUILD_REGIONS: (id: string) => `${GUILDS_BASE(id)}/regions`,
  GUILD_ROLE: (id: string, role_id: string) =>
    `${GUILDS_BASE(id)}/roles/${role_id}`,
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
};
