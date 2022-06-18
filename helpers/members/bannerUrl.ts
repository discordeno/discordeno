import type { Bot } from "../../bot.ts";
import type { ImageFormat } from "./avatarUrl.ts";

/** The user or member's custom banner */
export function bannerURL(
  bot: Bot,
  userId: bigint,
  banner: bigint,
  options?: {
    format?: ImageFormat;
    guildId?: bigint;
  },
) {
  return bot.utils.formatImageURL(
    options?.guildId
      ? bot.constants.routes.GUILD_MEMBER_BANNER(options.guildId, userId, bot.utils.iconBigintToHash(banner))
      : bot.constants.routes.USER_BANNER(userId, bot.utils.iconBigintToHash(banner)),
    undefined,
    options?.format,
  );
}
