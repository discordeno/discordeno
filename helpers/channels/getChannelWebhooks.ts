import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";
import { DiscordWebhook } from "../../types/discord.ts";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(bot: Bot, channelId: bigint) {
  const result = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_WEBHOOKS(channelId),
  );

  return new Collection(result.map((hook) => {
    const webhook = bot.transformers.webhook(bot, hook);
    return [webhook.id, webhook];
  }));
}
