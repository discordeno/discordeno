import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

/**
 * Builds a URL to a user's avatar stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param userId - The ID of the user to get the avatar of.
 * @param discriminator - The user's discriminator. (4-digit tag after the hashtag.)
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource.
 */
export function getAvatarURL(
  bot: Bot,
  userId: BigString,
  discriminator: string,
  options?: {
    avatar: BigString | undefined;
    size?: ImageSize;
    format?: ImageFormat;
  },
): string {
  return options?.avatar
    ? bot.utils.formatImageURL(
      bot.constants.routes.USER_AVATAR(
        userId,
        typeof options?.avatar === "string" ? options.avatar : bot.utils.iconBigintToHash(options?.avatar),
      ),
      options?.size || 128,
      options?.format,
    )
    : bot.constants.routes.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}

/**
 * https://discord.com/developers/docs/reference#image-formatting
 * json is only for stickers
 */
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "json";

/** https://discord.com/developers/docs/reference#image-formatting */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
