export const baseEndpoints = {
	/** Although, the version can be defaulted, keep the v6 as it can be changed to test newer versions when necessary. */
	BASE_URL: "https://discordapp.com/api/v6",
	CDN_URL: "https://cdn.discordapp.com",
}

export const endpoints = {
	GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,
	GUILD_BANNER: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/banners/${id}/${icon}`,
	GUILD_ICON: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/icons/${id}/${icon}`,
	GUILD_SPLASH: (id: string, icon: string) => `${baseEndpoints.CDN_URL}/splashes/${id}/${icon}`
}
