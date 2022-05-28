import type { Bot } from "../../bot.ts";
import { ImageFormat } from "./avatarUrl.ts";

/** The users custom avatar or the default avatar if you don't have a member object. */
export function bannerUrl(
  bot: Bot,
  guildId: bigint,
  userId: bigint,
  options?: {
    banner: bigint | undefined;
  },
) {
  return bot.utils.formatImageURL(
    bot.constants.routes.GUILD_MEMBER_BANNER(
      guildId,
      userId,
      bot.utils.iconBigintToHash(options.banner),
    ),
    undefined,
    "png",
  );
}
