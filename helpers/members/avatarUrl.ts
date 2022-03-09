import type { Bot } from "../../bot.ts";
import { ImageFormat, ImageSize } from "../../types/discordeno.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function avatarURL(
  bot: Bot,
  userId: bigint,
  discriminator: number,
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
