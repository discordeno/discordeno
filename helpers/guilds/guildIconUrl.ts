import type { Bot } from "../../bot.ts";
import { ImageFormat, ImageSize } from "../members/avatarUrl.ts";

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
      bot.constants.routes.GUILD_ICON(
        id,
        typeof icon === "string" ? icon : bot.utils.iconBigintToHash(icon),
      ),
      options?.size || 128,
      options?.format,
    )
    : undefined;
}
