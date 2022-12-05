import type { BigString, ImageFormat, ImageSize } from '@discordeno/types'
import { formatImageURL, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

// TODO: Move `banner` from `options` into the parameters and rename to `imageHash`.

/**
 * Builds a URL to the guild banner stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param guildId - The ID of the guild to get the link to the banner for.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has been set.
 */
export function getGuildBannerURL (
  rest: RestManager,
  guildId: BigString,
  options: {
    banner?: string | bigint
    size?: ImageSize
    format?: ImageFormat
  }
): string | undefined {
  return options.banner
    ? formatImageURL(
      rest.constants.routes.GUILD_BANNER(
        guildId,
        typeof options.banner === 'string'
          ? options.banner
          : iconBigintToHash(options.banner)
      ),
      options.size ?? 128,
      options.format
    )
    : undefined
}
