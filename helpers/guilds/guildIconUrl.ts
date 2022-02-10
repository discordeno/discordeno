import type { ImageFormat } from "../../types/misc/imageFormat.ts";
import type { ImageSize } from "../../types/misc/imageSize.ts";
import type { Bot } from "../../bot.ts";

/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
export function guildIconURL(
  bot: Bot,
  id: bigint,
  icon: bigint | undefined,
  options?: {
    size?: ImageSize;
    format?: ImageFormat;
  },
) {
  return icon
    ? bot.utils.formatImageURL(
      bot.constants.endpoints.GUILD_ICON(
        id,
        typeof icon === "string" ? icon : bot.utils.iconBigintToHash(icon),
      ),
      options?.size || 128,
      options?.format,
    )
    : undefined;
}
