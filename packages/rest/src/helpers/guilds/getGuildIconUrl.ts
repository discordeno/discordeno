import { routes } from '@discordeno/constant'
import type { BigString, ImageFormat, ImageSize } from '@discordeno/types'
import { formatImageURL, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Builds a URL to the guild icon stored in the Discord CDN.
 *
 * @param rest - The rest manager to use to build the URL.
 * @param guildId - The ID of the guild to get the link to the banner for.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has been set.
 */
export function getGuildIconURL (
  rest: RestManager,
  guildId: BigString,
  imageHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  }
): string | undefined {
  return imageHash
    ? formatImageURL(
      routes.GUILD_ICON(
        guildId,
        typeof imageHash === 'string'
          ? imageHash
          : iconBigintToHash(imageHash)
      ),
      options?.size ?? 128,
      options?.format
    )
    : undefined
}
