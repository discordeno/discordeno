import type { BigString, ImageFormat, ImageSize } from '@discordeno/types'
import { formatImageURL, iconBigintToHash } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Builds a URL to a user's avatar stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param userId - The ID of the user to get the avatar of.
 * @param discriminator - The user's discriminator. (4-digit tag after the hashtag.)
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource.
 */
export function getAvatarURL (
  rest: RestManager,
  userId: BigString,
  discriminator: string,
  options?: {
    avatar: BigString | undefined
    size?: ImageSize
    format?: ImageFormat
  }
): string {
  return options?.avatar
    ? formatImageURL(
      rest.constants.routes.USER_AVATAR(
        userId,
        typeof options?.avatar === 'string'
          ? options.avatar
          : iconBigintToHash(options?.avatar)
      ),
      options?.size ?? 128,
      options?.format
    )
    : rest.constants.routes.USER_DEFAULT_AVATAR(Number(discriminator) % 5)
}
