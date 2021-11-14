import type { ImageFormat } from "../../types/misc/imageFormat.ts";
import type { ImageSize } from "../../types/misc/imageSize.ts";
import type { Bot } from "../../bot.ts";

/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function guildBannerURL(
  bot: Bot,
  id: bigint,
  options: {
    banner?: string | bigint;
    size?: ImageSize;
    format?: ImageFormat;
  }
) {
  return options.banner
    ? bot.utils.formatImageURL(
        bot.constants.endpoints.GUILD_BANNER(
          id,
          typeof options.banner === "string" ? options.banner : bot.utils.iconBigintToHash(options.banner)
        ),
        options.size || 128,
        options.format
      )
    : undefined;
}
