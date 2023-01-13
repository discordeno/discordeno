/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { BigString, ImageFormat, ImageSize } from '@discordeno/types'
import { iconBigintToHash } from './hash.js'
import { formatImageURL } from './utils.js'

/**
 * Get the url for an emoji.
 *
 * @param emojiId The id of the emoji
 * @param animated Whether or not the emoji is animated
 * @returns string
 */
export function emojiUrl(emojiId: BigString, animated = false): string {
  return `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? 'gif' : 'png'}`
}

/**
 * Builds a URL to a user's avatar stored in the Discord CDN.
 *
 * @param userId - The ID of the user to get the avatar of.
 * @param discriminator - The user's discriminator. (4-digit tag after the hashtag.)
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource.
 */
export function avatarURL(
  userId: BigString,
  discriminator: string,
  options?: {
    avatar: BigString | undefined
    size?: ImageSize
    format?: ImageFormat
  },
): string {
  return options?.avatar
    ? formatImageURL(
        `https://cdn.discordapp.com/avatars/${userId}/${typeof options?.avatar === 'string' ? options.avatar : iconBigintToHash(options?.avatar)}`,
        options?.size ?? 128,
        options?.format,
      )
    : `https://cdn.discordapp.com/embed/avatars/${Number(discriminator) % 5}.png`
}
