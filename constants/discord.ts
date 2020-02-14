export const baseEndpoints = {
  /** Although, the version can be defaulted, keep the v6 as it can be changed to test newer versions when necessary. */
  BASE_URL: 'https://discordapp.com/api/v6',
  CDN_URL: 'https://cdn.discordapp.com'
}

export const endpoints = {
  GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,

  // Channel Endpoints
  CHANNEL_MESSAGE: (id: string, message_id: string) => `${baseEndpoints.BASE_URL}/channels/${id}/messages/${message_id}`,
  CHANNEL_MESSAGES: (id: string) => `${baseEndpoints.BASE_URL}/channels/${id}`

  // Guild Endpoints
  GUILD: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}`,
  GUILD_AUDIT_LOGS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/audit-logs`,
  GUILD_BAN: (id: string, user_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/bans/${user_id}`,
  GUILD_BANS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/bans`,
  GUILD_BANNER: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/banners/${id}/${icon}`,
  GUILD_CHANNELS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/channels`,
  GUILD_EMBED: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/embed`,
  GUILD_EMOJI: (id: string, emoji_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/emojis/${emoji_id}`,
  GUILD_EMOJIS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/emojis`,
  GUILD_ICON: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/icons/${id}/${icon}`,
  GUILD_INTEGRATION: (id: string, integration_id: string) =>
    `${baseEndpoints.BASE_URL}/guilds/${id}/integrations/${integration_id}`,
  GUILD_INTEGRATION_SYNC: (id: string, integration_id: string) =>
    `${baseEndpoints.BASE_URL}/guilds/${id}/integrations/${integration_id}/sync`,
  GUILD_INTEGRATIONS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/integrations`,
	GUILD_INVITES: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/invites`,
	GUILD_LEAVE: (id: string) => `${baseEndpoints.BASE_URL}/users/@me/guilds/${id}`,
  GUILD_MEMBER: (id: string, member_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/members/${member_id}`,
  GUILD_MEMBER_ROLE: (id: string, member_id: string, role_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/members/${member_id}/roles/${role_id}`,
  GUILD_PRUNE: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/prune`,
  GUILD_REGIONS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/regions`,
  GUILD_ROLE: (id: string, role_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/roles/${role_id}`,
  GUILD_ROLES: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/roles`,
  GUILD_SPLASH: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/splashes/${id}/${icon}`,
	GUILD_VANITY_URL: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/vanity-url`,
  GUILD_WEBHOOKS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/webhooks`,

  // User endpoints
  USER_AVATAR: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/avatars/${id}/${icon}`,
  USER_DEFAULT_AVATAR: (icon: number) => `${baseEndpoints.CDN_URL}/embed/avatars${icon}.png`
}
