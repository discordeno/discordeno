import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import type { Bot } from "../../bot.ts";

/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function guildBannerURL(
    bot: Bot,
  id: bigint,
  options: {
    banner?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
    animated?: boolean;
  }
) {
  return options.banner
    ? bot.utils.formatImageURL(
        bot.constants.endpoints.GUILD_BANNER(
          id,
          typeof options.banner === "string"
            ? options.banner
            : bot.utils.iconBigintToHash(options.banner, options.animated ?? true)
        ),
        options.size || 128,
        options.format
      )
    : undefined;
}
