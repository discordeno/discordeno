import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import type { Bot } from "../../bot.ts";

/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export function guildSplashURL(
  bot: Bot,
  id: bigint,
  options: {
    splash?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
  }
) {
  return options.splash
    ? bot.utils.formatImageURL(
        bot.constants.endpoints.GUILD_SPLASH(
          id,
          typeof options.splash === "string"
            ? options.splash
            : bot.utils.iconBigintToHash(options.splash)
        ),
        options.size || 128,
        options.format
      )
    : undefined;
}
