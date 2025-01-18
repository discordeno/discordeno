/** Types for: https://discord.com/developers/docs/resources/emoji */

import type { DiscordUser } from '../discord.js'

/** https://discord.com/developers/docs/resources/emoji#emoji-object-emoji-structure */
export interface DiscordEmoji {
  /** Emoji name (can only be null in reaction emoji objects) */
  name?: string
  /** Emoji id */
  id?: string
  /** Roles allowed to use this emoji */
  roles?: string[]
  /** User that created this emoji */
  user?: DiscordUser
  /** Whether this emoji must be wrapped in colons */
  require_colons?: boolean
  /** Whether this emoji is managed */
  managed?: boolean
  /** Whether this emoji is animated */
  animated?: boolean
  /** Whether this emoji can be used, may be false due to loss of Server Boosts */
  available?: boolean
}

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji-json-params */
export interface DiscordCreateGuildEmoji {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code. If a URL is provided to the image parameter, Discordeno will automatically convert it to a base64 string internally. */
  image: string
  /** Roles allowed to use this emoji */
  roles?: string[]
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji-json-params */
export interface DiscordModifyGuildEmoji {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: string[] | null
}
