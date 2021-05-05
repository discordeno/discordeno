import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import { endpoints } from "../../util/constants.ts";
import { formatImageURL } from "../../util/utils.ts";

/** The full URL of the banner from Discords CDN. Undefined if no banner is set. */
export function guildBannerURL(
  id: bigint,
  banner?: string,
  size: DiscordImageSize = 128,
  format?: DiscordImageFormat,
) {
  return banner
    ? formatImageURL(endpoints.GUILD_BANNER(id, banner), size, format)
    : undefined;
}
