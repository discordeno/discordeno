import type { Bot } from "../../bot.ts";
import { ImageFormat, ImageSize } from "../members/getAvatarUrl.ts";

/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function getGuildBannerURL(
  bot: Bot,
  id: bigint,
  options: {
    banner?: string | bigint;
    size?: ImageSize;
    format?: ImageFormat;
  },
): string | undefined {
  return options.banner
    ? bot.utils.formatImageURL(
      bot.constants.routes.GUILD_BANNER(
        id,
        typeof options.banner === "string" ? options.banner : bot.utils.iconBigintToHash(options.banner),
      ),
      options.size || 128,
      options.format,
    )
    : undefined;
}
