export const baseEndpoints = {
	/** Although, the version can be defaulted, keep the v6 as it can be changed to test newer versions when necessary. */
	BASE_URL: "https://discordapp.com/api/v6",
	CDN_URL: "https://cdn.discordapp.com",
}

export const endpoints = {
	GATEWAY_BOT: `${baseEndpoints.BASE_URL}/gateway/bot`,
}
