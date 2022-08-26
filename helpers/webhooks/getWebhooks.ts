import type { Bot } from "../../bot.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordWebhook } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(bot: Bot, guildId: bigint): Promise<Collection<bigint, Webhook>> {
  const results = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_WEBHOOKS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const webhook = bot.transformers.webhook(bot, result);
      return [webhook.id, webhook];
    }),
  );
}
