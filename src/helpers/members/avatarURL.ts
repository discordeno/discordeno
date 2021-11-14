import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import type { Bot } from "../../bot.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function avatarURL(
  bot: Bot,
  userId: bigint,
  discriminator: number,
  options: {
    avatar?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
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
