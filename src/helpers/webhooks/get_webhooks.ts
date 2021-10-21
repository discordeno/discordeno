import type {Bot} from "../../bot.ts";
import type { Webhook } from "../../types/webhooks/webhook.ts";
import { Collection } from "../../util/collection.ts";
import {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(bot: Bot, guildId: bigint) {
  await bot.utils.requireBotGuildPermissions(guildId, ["MANAGE_WEBHOOKS"]);

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Webhook>[]>(bot.rest,"get", bot.constants.endpoints.GUILD_WEBHOOKS(guildId));

  return new Collection(result.map((webhook) => [webhook.id, webhook]));
}
