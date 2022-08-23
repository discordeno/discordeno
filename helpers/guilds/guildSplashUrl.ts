import type { Bot } from "../../bot.ts";
import { ImageFormat, ImageSize } from "../members/avatarUrl.ts";

/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export function guildSplashURL(
  bot: Bot,
  id: bigint,
  splash: bigint | undefined,
  options?: {
    size?: ImageSize;
    format?: ImageFormat;
  },
) {
  return splash
    ? bot.utils.formatImageURL(
      bot.constants.routes.GUILD_SPLASH(
        id,
        typeof splash === "string" ? splash : bot.utils.iconBigintToHash(splash),
      ),
      options?.size || 128,
      options?.format,
    )
    : undefined;
}
