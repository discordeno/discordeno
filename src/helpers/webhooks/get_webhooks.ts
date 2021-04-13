import { rest } from "../../rest/rest.ts";
import { DiscordWebhook, Webhook } from "../../types/webhooks/webhook.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { snakeKeysToCamelCase } from "../../util/utils.ts";

/** Returns a list of guild webhooks objects. Requires the MANAGE_WEBHOOKs permission. */
export async function getWebhooks(guildId: string) {
  await requireBotGuildPermissions(guildId, ["MANAGE_WEBHOOKS"]);

  const result = (await rest.runMethod(
    "get",
    endpoints.GUILD_WEBHOOKS(guildId),
  )) as DiscordWebhook[];

  return new Collection(
    result.map((webhook) => [
      webhook.id,
      snakeKeysToCamelCase<Webhook>(webhook),
    ]),
  );
}
