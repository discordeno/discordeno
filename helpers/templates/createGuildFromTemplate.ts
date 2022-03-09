import type { CreateGuildFromTemplate } from "../../types/templates/createGuildFromTemplate.ts";
import type { Bot } from "../../bot.ts";
import { DiscordGuild } from "../../types/discord.ts";

/**
 * Create a new guild based on a template
 * NOTE: This endpoint can be used only by bots in less than 10 guilds.
 */
export async function createGuildFromTemplate(bot: Bot, templateCode: string, data: CreateGuildFromTemplate) {
  if (data.icon) {
    data.icon = await bot.utils.urlToBase64(data.icon);
  }

  const createdGuild = await bot.rest.runMethod<DiscordGuild>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_TEMPLATE(templateCode),
    data,
  );

  return bot.transformers.guild(bot, {
    guild: createdGuild,
    shardId: bot.utils.calculateShardId(bot.gateway, bot.transformers.snowflake(createdGuild.id)),
  });
}
