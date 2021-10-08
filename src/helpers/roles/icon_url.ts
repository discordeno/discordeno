import type { DiscordImageFormat } from "../../types/misc/image_format.ts";
import type { DiscordImageSize } from "../../types/misc/image_size.ts";
import { endpoints } from "../../util/constants.ts";
import { formatImageURL } from "../../util/utils.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function iconURL(
  roleId: bigint,
  options: {
    icon?: string | bigint;
    size?: DiscordImageSize;
    format?: DiscordImageFormat;
  }
) {
  return options.icon
    ? formatImageURL(
        endpoints.ROLE_ICON(
            roleId,
          typeof options.icon === "string"
            ? options.icon
            : options.icon.toString(16).padStart(32, "0")
        ),
        options.size || 128,
        options.format
      )
    : null;
}
