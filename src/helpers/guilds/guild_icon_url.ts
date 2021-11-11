import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import type { Bot } from "../../bot.ts";

/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
export function guildIconURL(
  bot: Bot,
  id: bigint,
  options: {
    icon?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
  }
) {
  return options.icon
    ? bot.utils.formatImageURL(
        bot.constants.endpoints.GUILD_ICON(
          id,
          typeof options.icon === "string" ? options.icon : bot.utils.iconBigintToHash(options.icon)
        ),
        options.size || 128,
        options.format
      )
    : undefined;
}
