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
	GUILD_EMOJI: (id: string, emojiID: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/emojis/${emojiID}`,
	GUILD_EMOJIS: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/emojis`,
	GUILD_ICON: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/icons/${id}/${icon}`,
	GUILD_PRUNE: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/prune`,
	GUILD_ROLE: (id: string, roleID: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/roles/${roleID}`,
	GUILD_ROLES: (id: string) => `${baseEndpoints.BASE_URL}/guilds/${id}/roles`,
	GUILD_SPLASH: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/splashes/${id}/${icon}`
}
