/** Types for: https://discord.com/developers/docs/resources/emoji */

import type { BigString } from '../shared.js'

/** https://discord.com/developers/docs/resources/emoji#create-guild-emoji */
export interface CreateGuildEmoji {
  /** Name of the emoji */
  name: string
  /** The 128x128 emoji image. */
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
  /** The 128x128 emoji image. */
  image: string
}

/** https://discord.com/developers/docs/resources/emoji#modify-application-emoji */
export interface ModifyApplicationEmoji {
  /** Name of the emoji */
  name: string
}
