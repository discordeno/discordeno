import type { ImageFormat } from "../../types/misc/imageFormat.ts";
import type { ImageSize } from "../../types/misc/imageSize.ts";
import type { Bot } from "../../bot.ts";

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
      bot.constants.endpoints.GUILD_SPLASH(
        id,
        typeof splash === "string" ? splash : bot.utils.iconBigintToHash(splash),
      ),
      options?.size || 128,
      options?.format,
    )
    : undefined;
}
