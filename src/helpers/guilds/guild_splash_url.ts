import { DiscordImageFormat } from "../../types/misc/image_format.ts";
import { DiscordImageSize } from "../../types/misc/image_size.ts";
import { endpoints } from "../../util/constants.ts";
import { formatImageURL } from "../../util/utils.ts";

/** The full URL of the splash from Discords CDN. Undefined if no splash is set. */
export function guildSplashURL(
  id: bigint,
  splash?: string,
  size: DiscordImageSize = 128,
  format?: DiscordImageFormat,
) {
  return splash
    ? formatImageURL(
      endpoints.GUILD_SPLASH(id, splash),
      size,
      format,
    )
    : undefined;
}
