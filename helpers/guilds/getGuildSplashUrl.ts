import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";
import { ImageFormat, ImageSize } from "../members/getAvatarUrl.ts";

/**
 * Builds the URL to a guild splash stored in the Discord CDN.
 *
 * @param bot - The bot instance to use to build the URL.
 * @param guildId - The ID of the guild to get the splash of.
 * @param imageHash - The hash identifying the splash image.
 * @param options - The parameters for the building of the URL.
 * @returns The link to the resource or `undefined` if the guild does not have a splash image set.
 */
export function getGuildSplashURL(
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
      bot.constants.routes.GUILD_SPLASH(
        guildId,
        typeof imageHash === "string" ? imageHash : bot.utils.iconBigintToHash(imageHash),
      ),
      options?.size || 128,
      options?.format,
    )
    : undefined;
}
