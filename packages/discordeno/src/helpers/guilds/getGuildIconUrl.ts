import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";
import { ImageFormat, ImageSize } from "../members/getAvatarUrl.ts";

/**
 * Builds a URL to the guild icon stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param guildId - The ID of the guild to get the link to the banner for.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if no banner has been set.
 */
export function getGuildIconURL(
  bot: Bot,
  guildId: BigString,
  imageHash: BigString | undefined,
  options?: {
    size?: ImageSize;
    format?: ImageFormat;
  },
): string | undefined {
  return imageHash
    ? bot.utils.formatImageURL(
      bot.constants.routes.GUILD_ICON(
        guildId,
        typeof imageHash === "string" ? imageHash : bot.utils.iconBigintToHash(imageHash),
      ),
      options?.size || 128,
      options?.format,
    )
    : undefined;
}
