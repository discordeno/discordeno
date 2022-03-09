import type { Bot } from "../../bot.ts";
import { DiscordGuild } from "../../types/discord.ts";
import type { ModifyGuild } from "../../types/guilds/modifyGuild.ts";

/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export async function editGuild(bot: Bot, guildId: bigint, options: ModifyGuild, shardId: number) {
  if (options.icon && !options.icon.startsWith("data:image/")) {
    options.icon = await bot.utils.urlToBase64(options.icon);
  }

  if (options.banner && !options.banner.startsWith("data:image/")) {
    options.banner = await bot.utils.urlToBase64(options.banner);
  }

  if (options.splash && !options.splash.startsWith("data:image/")) {
    options.splash = await bot.utils.urlToBase64(options.splash);
  }

  const result = await bot.rest.runMethod<DiscordGuild>(
    bot.rest,
    "patch",
    bot.constants.endpoints.GUILDS_BASE(guildId),
    options,
  );

  return bot.transformers.guild(bot, {
    guild: result,
    shardId,
  });
}
