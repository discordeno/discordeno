import { rest } from "../../rest/rest.ts";
import { DiscordWebhook, Webhook } from "../../types/webhooks/webhook.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(channelId: string) {
  await requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  const result = (await rest.runMethod(
    "get",
    endpoints.CHANNEL_WEBHOOKS(channelId)
  )) as DiscordWebhook[];

  return new Collection(
    result
      .map((webhook) => snakeKeysToCamelCase<Webhook>(webhook))
      .map((webhook) => [webhook.id, webhook])
  );
}
