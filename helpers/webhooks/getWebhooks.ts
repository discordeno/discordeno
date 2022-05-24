import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    "GET",
    bot.constants.endpoints.GUILD_WEBHOOKS(guildId),
  );

  return new Collection(result.map((hook) => {
    const webhook = bot.transformers.webhook(bot, hook);
    return [webhook.id, webhook];
  }));
}
