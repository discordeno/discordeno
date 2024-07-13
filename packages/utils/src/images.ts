import { type BigString, type GetGuildWidgetImageQuery, type ImageFormat, type ImageSize, StickerFormatTypes } from '@discordeno/types'
import { iconBigintToHash } from './hash.js'

/** Help format an image url. */
export function formatImageUrl(url: string, size: ImageSize = 128, format?: ImageFormat): string {
  return `${url}.${format ?? (url.includes('/a_') ? 'gif' : 'jpg')}?size=${size}`
}

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
export function avatarUrl(
  userId: BigString,
  discriminator: string,
  options?: {
    avatar: BigString | undefined
    size?: ImageSize
    format?: ImageFormat
  },
): string {
  return options?.avatar
    ? formatImageUrl(
        `https://cdn.discordapp.com/avatars/${userId}/${typeof options.avatar === 'string' ? options.avatar : iconBigintToHash(options.avatar)}`,
        options?.size ?? 128,
        options?.format,
      )
    : `https://cdn.discordapp.com/embed/avatars/${discriminator === '0' ? (BigInt(userId) >> BigInt(22)) % BigInt(6) : Number(discriminator) % 5}.png`
}

export function avatarDecorationUrl(avatarDecoration: BigString): string {
  return `https://cdn.discordapp.com/avatar-decoration-presets/${
    typeof avatarDecoration === 'string' ? avatarDecoration : iconBigintToHash(avatarDecoration)
  }.png`
}

/**
 * Builds a URL to a user's banner stored in the Discord CDN.
 *
 * @param userId - The ID of the user to get the banner of.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has not been set.
 */
export function bannerUrl(
  userId: BigString,
  options?: {
    banner?: BigString
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return options?.banner
    ? formatImageUrl(
        `https://cdn.discordapp.com/banners/${userId}/${typeof options.banner === 'string' ? options.banner : iconBigintToHash(options.banner)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds a URL to the guild banner stored in the Discord CDN.
 *
 * @param guildId - The ID of the guild to get the link to the banner for.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has been set.
 */
export function guildBannerUrl(
  guildId: BigString,
  options: {
    banner?: BigString
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return options.banner
    ? formatImageUrl(
        `https://cdn.discordapp.com/banners/${guildId}/${typeof options.banner === 'string' ? options.banner : iconBigintToHash(options.banner)}`,
        options.size ?? 128,
        options.format,
      )
    : undefined
}

/**
 * Builds a URL to the guild icon stored in the Discord CDN.
 *
 * @param guildId - The ID of the guild to get the link to the banner for.
 * @param imageHash - The hash identifying the event cover image.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has been set.
 */
export function guildIconUrl(
  guildId: BigString,
  imageHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return imageHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/icons/${guildId}/${typeof imageHash === 'string' ? imageHash : iconBigintToHash(imageHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to a guild splash stored in the Discord CDN.
 *
 * @param guildId - The ID of the guild to get the splash of.
 * @param imageHash - The hash identifying the splash image.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if the guild does not have a splash image set.
 */
export function guildSplashUrl(
  guildId: BigString,
  imageHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return imageHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/splashes/${guildId}/${typeof imageHash === 'string' ? imageHash : iconBigintToHash(imageHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to a guild discovery splash stored in the Discord CDN.
 *
 * @param guildId - The ID of the guild to get the splash of.
 * @param imageHash - The hash identifying the discovery splash image.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if the guild does not have a splash image set.
 */
export function guildDiscoverySplashUrl(
  guildId: BigString,
  imageHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return imageHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/discovery-splashes/${guildId}/${typeof imageHash === 'string' ? imageHash : iconBigintToHash(imageHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to a guild scheduled event cover stored in the Discord CDN.
 *
 * @param eventId - The ID of the scheduled event to get the cover of.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function guildScheduledEventCoverUrl(
  eventId: BigString,
  options: {
    cover?: BigString
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return options.cover
    ? formatImageUrl(
        `https://cdn.discordapp.com/guild-events/${eventId}/${typeof options.cover === 'string' ? options.cover : iconBigintToHash(options.cover)}`,
        options.size ?? 128,
        options.format,
      )
    : undefined
}

/**
 * Builds a URL to the guild widget image stored in the Discord CDN.
 *
 * @param guildId - The ID of the guild to get the link to the widget image for.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource.
 */
export function getWidgetImageUrl(guildId: BigString, options?: GetGuildWidgetImageQuery): string {
  let url = `https://discordapp.com/api/guilds/${guildId}/widget.png`

  if (options?.style) {
    url += `?style=${options.style}`
  }

  return url
}

/**
 * Builds a URL to a member's avatar stored in the Discord CDN.
 *
 * @param guildId - The ID of the guild where the member is
 * @param userId - The ID of the user to get the avatar of.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has been set.
 */
export function memberAvatarUrl(
  guildId: BigString,
  userId: BigString,
  options?: {
    avatar?: BigString
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return options?.avatar
    ? formatImageUrl(
        `https://cdn.discordapp.com/guilds/${guildId}/users/${userId}/avatars/${
          typeof options.avatar === 'string' ? options.avatar : iconBigintToHash(options.avatar)
        }`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to an application icon stored in the Discord CDN.
 *
 * @param applicationId - The ID of the application to get the icon of.
 * @param iconHash - The hash identifying the application icon.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`
 */
export function applicationIconUrl(
  applicationId: BigString,
  iconHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return iconHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/app-icons/${applicationId}/${typeof iconHash === 'string' ? iconHash : iconBigintToHash(iconHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to an application cover stored in the Discord CDN.
 *
 * @param applicationId - The ID of the application to get the cover of.
 * @param coverHash - The hash identifying the application cover.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function applicationCoverUrl(
  applicationId: BigString,
  coverHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return coverHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/app-icons/${applicationId}/${typeof coverHash === 'string' ? coverHash : iconBigintToHash(coverHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to an application asset stored in the Discord CDN.
 *
 * @param applicationId - The ID of the application to get the asset of.
 * @param assetId - The id identifying the application asset.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function applicationAssetUrl(
  applicationId: BigString,
  assetId: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return assetId
    ? formatImageUrl(
        `https://cdn.discordapp.com/app-icons/${applicationId}/${typeof assetId === 'string' ? assetId : iconBigintToHash(assetId)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to a sticker pack banner stored in the Discord CDN.
 *
 * @param bannerAssetId - The ID of the banner asset for the sticker pack.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function stickerPackBannerUrl(
  bannerAssetId: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return bannerAssetId
    ? formatImageUrl(
        `https://cdn.discordapp.com/app-assets/710982414301790216/store/${
          typeof bannerAssetId === 'string' ? bannerAssetId : iconBigintToHash(bannerAssetId)
        }`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to a sticker stored in the Discord CDN.
 *
 * @param stickerId - The ID of the sticker to get the icon of
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function stickerUrl(
  stickerId: BigString | number,
  options?: {
    size?: ImageSize
    format?: ImageFormat
    type?: StickerFormatTypes
  },
): string | undefined {
  if (!stickerId) return

  const url =
    options?.type === StickerFormatTypes.Gif
      ? `https://media.discordapp.net/stickers/${stickerId}`
      : `https://cdn.discordapp.com/stickers/${stickerId}`

  return formatImageUrl(url, options?.size ?? 128, options?.format)
}

/**
 * Builds the URL to a team icon stored in the Discord CDN.
 *
 * @param teamId - The ID of the team to get the icon of
 * @param iconHash - The hash of the team icon.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function teamIconUrl(
  teamId: BigString,
  iconHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return iconHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/team-icons/${teamId}/store/${typeof iconHash === 'string' ? iconHash : iconBigintToHash(iconHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}

/**
 * Builds the URL to a role icon stored in the Discord CDN.
 *
 * @param roleId - The ID of the role to get the icon of
 * @param iconHash - The hash of the role icon.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined`.
 */
export function roleIconUrl(
  roleId: BigString,
  iconHash: BigString | undefined,
  options?: {
    size?: ImageSize
    format?: ImageFormat
  },
): string | undefined {
  return iconHash
    ? formatImageUrl(
        `https://cdn.discordapp.com/role-icons/${roleId}/${typeof iconHash === 'string' ? iconHash : iconBigintToHash(iconHash)}`,
        options?.size ?? 128,
        options?.format,
      )
    : undefined
}
