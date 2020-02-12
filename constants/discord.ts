export const baseEndpoints = {
	/** Although, the version can be defaulted, keep the v6 as it can be changed to test newer versions when necessary. */
	BASE_URL: "https://discordapp.com/api/v6",
	CDN_URL: "https://cdn.discordapp.com",
}

export const endpoints = {
	GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,
	GUILD_AUDIT_LOGS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/audit-logs`,
	GUILD_BANNER: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/banners/${id}/${icon}`,
	GUILD_CHANNELS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/channels`,
	GUILD_EMBED: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/embed`,
	GUILD_EMOJI: (id: string, emoji_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/emojis/${emoji_id}`,
	GUILD_EMOJIS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/emojis`,
	GUILD_ICON: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/icons/${id}/${icon}`,
	GUILD_INTEGRATION: (id: string, integration_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/integrations/${integration_id}`,
	GUILD_INTEGRATIONS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/integrations`,
	GUILD_PRUNE: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/prune`,
	GUILD_ROLE: (id: string, role_id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/roles/${role_id}`,
	GUILD_ROLES: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/roles`,
	GUILD_SPLASH: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/splashes/${id}/${icon}`,
	GUILD_VANITY_URL: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/vanity-url`
}
