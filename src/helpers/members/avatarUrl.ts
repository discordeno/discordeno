import type { ImageFormat } from "../../types/misc/imageFormat.ts";
import type { ImageSize } from "../../types/misc/imageSize.ts";
import type { Bot } from "../../bot.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function avatarURL(
  bot: Bot,
  userId: bigint,
  discriminator: number,
  options?: {
    avatar?: string | bigint;
    size?: ImageSize;
    format?: ImageFormat;
  }
) {
  return options.avatar
    ? bot.utils.formatImageURL(
        bot.constants.endpoints.USER_AVATAR(
          userId,
          typeof options.avatar === "string" ? options.avatar : bot.utils.iconBigintToHash(options.avatar)
        ),
        options.size || 128,
        options.format
      )
    : bot.constants.endpoints.USER_DEFAULT_AVATAR(Number(discriminator) % 5);
}
