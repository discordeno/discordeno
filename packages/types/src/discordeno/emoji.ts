/** Types for: https://discord.com/developers/docs/resources/emoji */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string
  /**
   * The 128x128 emoji image.
   *
   * @remarks
   * Image data is a [Data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) that supports JPG, GIF, and PNG formats.
   *
   * An example Data URI format is: `data:image/jpeg;base64,BASE64_ENCODED_JPEG_IMAGE_DATA`.
   * Ensure you use the proper content type (image/jpeg, image/png, image/gif) that matches the image data being provided.
   *
   * Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code.
   */
  image: string
  /** Roles allowed to use this emoji */
  roles: BigString[]
}

/** https://discord.com/developers/docs/resources/emoji#modify-guild-emoji */
export interface ModifyGuildEmoji {
  /** Name of the emoji */
  name?: string
  /** Roles allowed to use this emoji */
  roles?: BigString[] | null
}

/** https://discord.com/developers/docs/resources/emoji#create-application-emoji */
export interface CreateApplicationEmoji {
  /** Name of the emoji */
  name: string
  /**
   * The 128x128 emoji image.
   *
   * @remarks
   * Image data is a [Data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme) that supports JPG, GIF, and PNG formats.
   *
   * An example Data URI format is: `data:image/jpeg;base64,BASE64_ENCODED_JPEG_IMAGE_DATA`.
   * Ensure you use the proper content type (image/jpeg, image/png, image/gif) that matches the image data being provided.
   *
   * Emojis and animated emojis have a maximum file size of 256kb. Attempting to upload an emoji larger than this limit will fail and return 400 Bad Request and an error message, but not a JSON status code.
   */
  image: string
}

/** https://discord.com/developers/docs/resources/emoji#modify-application-emoji */
export interface ModifyApplicationEmoji {
  /** Name of the emoji */
  name?: string
}
