import type { Guild } from "../../types/guilds/guild.ts";
import type { CreateGuildFromTemplate } from "../../types/templates/create_guild_from_template.ts";
import type { Bot } from "../../bot.ts";

/**
 * Create a new guild based on a template
 * NOTE: This endpoint can be used only by bots in less than 10 guilds.
 */
export async function createGuildFromTemplate(bot: Bot, templateCode: string, data: CreateGuildFromTemplate) {
  if ((await bot.cache.guilds.size()) >= 10) {
    throw new Error("This function can only be used by bots in less than 10 guilds.");
  }

  if (data.icon) {
    data.icon = await bot.utils.urlToBase64(data.icon);
  }

  const createdGuild = await bot.rest.runMethod<Guild>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_TEMPLATE(templateCode),
    data
  );

  return bot.transformers.guild(
    createdGuild,
    Number((BigInt(createdGuild.id) >> 22n % BigInt(bot.ws.botGatewayData.shards)).toString())
  );
}
