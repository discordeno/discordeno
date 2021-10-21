import type { Bot } from "../../bot.ts";
import type { Guild } from "../../types/guilds/guild.ts";
import type { ModifyGuild } from "../../types/guilds/modify_guild.ts";

/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export async function editGuild(bot: Bot, guildId: bigint, options: ModifyGuild) {
  await bot.utils.requireBotGuildPermissions(bot, guildId, ["MANAGE_GUILD"]);

  if (options.icon && !options.icon.startsWith("data:image/")) {
    options.icon = await bot.utils.urlToBase64(options.icon);
  }

  if (options.banner && !options.banner.startsWith("data:image/")) {
    options.banner = await bot.utils.urlToBase64(options.banner);
  }

  if (options.splash && !options.splash.startsWith("data:image/")) {
    options.splash = await bot.utils.urlToBase64(options.splash);
  }

  const result = await bot.rest.runMethod<Guild>(bot.rest,"patch", bot.constants.endpoints.GUILDS_BASE(guildId), {

  });

  const cached = await bot.cache.guilds.get(guildId);
  return bot.transformers.guild(
      bot,
      {
        guild: result,
        shardId: cached?.shardId || Number((BigInt(result.id) >> 22n % BigInt(bot.gateway.botGatewayData.shards)).toString())
      }
  );
}
