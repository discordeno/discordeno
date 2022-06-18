/** https://discord.com/developers/docs/reference#api-reference-base-url */
export const BASE_URL = "https://discord.com/api";

/** https://discord.com/developers/docs/reference#api-versioning-api-versions */
export const API_VERSION = 10;

// TODO: update this version
/** https://github.com/discordeno/discordeno/releases */
export const DISCORDENO_VERSION = "13.0.0-rc45";

/** https://discord.com/developers/docs/reference#user-agent */
export const USER_AGENT = `DiscordBot (https://github.com/discordeno/discordeno, v${DISCORDENO_VERSION})`;

/** https://discord.com/developers/docs/reference#image-formatting-image-base-url */
export const IMAGE_BASE_URL = "https://cdn.discordapp.com";

// This can be modified by big brain bots and use a proxy
export const baseEndpoints = {
  BASE_URL: `${BASE_URL}/v${API_VERSION}`,
  CDN_URL: IMAGE_BASE_URL,
};

export const SLASH_COMMANDS_NAME_REGEX = /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u;
export const CONTEXT_MENU_COMMANDS_NAME_REGEX = /^[\w-\s]{1,32}$/;
export const CHANNEL_MENTION_REGEX = /<#[0-9]+>/g;
export const DISCORD_SNOWFLAKE_REGEX = /^(?<id>\d{17,19})$/;
