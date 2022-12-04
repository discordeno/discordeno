import { BigString, ImageFormat, ImageSize } from '@discordeno/types'
import { formatImageURL, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Builds the URL to a guild splash stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param guildId - The ID of the guild to get the splash of.
 * @param imageHash - The hash identifying the splash image.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if the guild does not have a splash image set.
 */
export function getGuildSplashURL (
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
      rest.constants.routes.GUILD_SPLASH(
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
