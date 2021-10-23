import type { Webhook } from "../../types/webhooks/webhook.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(bot: Bot, channelId: bigint) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["MANAGE_WEBHOOKS"]);

  const result = await bot.rest.runMethod<Webhook[]>(bot.rest,"get", bot.constants.endpoints.CHANNEL_WEBHOOKS(channelId));

  return new Collection(result.map((webhook) => [webhook.id, webhook]));
}
