import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import { endpoints } from "../../util/constants.ts";
import { formatImageURL } from "../../util/utils.ts";

/** The full URL of the icon from Discords CDN. Undefined when no icon is set. */
export function guildIconURL(
  id: bigint,
  icon?: string,
  size: DiscordImageSize = 128,
  format?: DiscordImageFormat,
) {
  return icon
    ? formatImageURL(endpoints.GUILD_ICON(id, icon), size, format)
    : undefined;
}
