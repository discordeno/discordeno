import type { Bot } from "../../bot.ts";
import type { ImageFormat } from "./avatarUrl.ts";

/** The user or member's custom banner */
export function bannerURL(
  bot: Bot,
  userId: bigint,
  options: {
    banner: bigint;
    format?: ImageFormat;
    guildId?: bigint;
  },
) {
  return bot.utils.formatImageURL(
    options.guildId
      ? bot.constants.routes.GUILD_MEMBER_BANNER(options.guildId, userId, bot.utils.iconBigintToHash(options.banner))
      : bot.constants.routes.USER_BANNER(userId, bot.utils.iconBigintToHash(options.banner)),
    undefined,
    options?.format,
  );
}
