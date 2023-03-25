export const SLASH_COMMANDS_NAME_REGEX = /^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/u
export const CONTEXT_MENU_COMMANDS_NAME_REGEX = /^[\w-\s]{1,32}$/
export const CHANNEL_MENTION_REGEX = /<#[0-9]+>/g
export const DISCORD_SNOWFLAKE_REGEX = /^(?<id>\d{17,19})$/
