/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { BigString, GetGuildWidgetImageQuery, ImageFormat, ImageSize } from '@discordeno/types'
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

export function avatarDecorationUrl(userId: BigString, avatarDecoration: BigString): string {
  return `https://cdn.discordapp.com/avatar-decorations/${userId}/${
    typeof avatarDecoration === 'string' ? avatarDecoration : iconBigintToHash(avatarDecoration)
  }.png`
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
    banner?: string | bigint
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
