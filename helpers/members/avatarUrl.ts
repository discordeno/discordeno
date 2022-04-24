import type { Bot } from "../../bot.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function avatarURL(
  bot: Bot,
  userId: bigint,
  discriminator: string,
  options?: {
    avatar: bigint | undefined;
    size?: ImageSize;
    format?: ImageFormat;
  },
) {
  return options?.avatar
    ? bot.utils.formatImageURL(
      bot.constants.endpoints.USER_AVATAR(
        userId,
        typeof options?.avatar === "string" ? options.avatar : bot.utils.iconBigintToHash(options?.avatar),
      ),
      options?.size || 128,
      options?.format,
    )
    : bot.constants.endpoints.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}

/**
 * https://discord.com/developers/docs/reference#image-formatting
 * json is only for stickers
 */
export type ImageFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "json";

/** https://discord.com/developers/docs/reference#image-formatting */
export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;
