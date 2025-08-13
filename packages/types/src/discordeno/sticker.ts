/** Types for: https://discord.com/developers/docs/resources/sticker */

import type { FileContent } from './reference.js'

/** https://discord.com/developers/docs/resources/sticker#create-guild-sticker-form-params */
export interface CreateGuildStickerOptions {
  /** Name of the sticker (2-30 characters) */
  name: string
  /** Description of the sticker (empty or 2-100 characters) */
  description: string
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags: string
  /**
   * The sticker file to upload, must be a PNG, APNG, or Lottie JSON file
   *
   * @remarks
   * max 512 KB.
   *
   * Lottie stickers can only be uploaded on guilds that have either the VERIFIED and/or the PARTNERED [guild feature](https://discord.com/developers/docs/resources/guild#guild-object-guild-features).
   *
   * Uploaded stickers are constrained to 5 seconds in length for animated stickers, and 320 x 320 pixels.
   */
  file: FileContent
}

/** https://discord.com/developers/docs/resources/sticker#modify-guild-sticker-json-params */
export interface EditGuildStickerOptions {
  /** Name of the sticker (2-30 characters) */
  name?: string
  /** Description of the sticker (empty or 2-100 characters) */
  description?: string | null
  /** Autocomplete/suggestion tags for the sticker (max 200 characters) */
  tags?: string
}
