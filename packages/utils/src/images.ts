import type { BigString } from '@discordeno/types'

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
