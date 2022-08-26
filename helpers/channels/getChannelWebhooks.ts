import type { Bot } from "../../bot.ts";
import { Webhook } from "../../transformers/webhook.ts";
import { DiscordWebhook } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(bot: Bot, channelId: bigint): Promise<Collection<bigint, Webhook>> {
  const results = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_WEBHOOKS(channelId),
  );

  return new Collection(
    results.map((result) => {
      const webhook = bot.transformers.webhook(bot, result);
      return [webhook.id, webhook];
    }),
  );
}
