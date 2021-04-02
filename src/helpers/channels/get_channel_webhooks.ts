import { rest } from "../../rest/rest.ts";
import { DiscordWebhook } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Gets the webhooks for this channel. Requires MANAGE_WEBHOOKS */
export async function getChannelWebhooks(channelId: string) {
  await requireBotChannelPermissions(channelId, ["MANAGE_WEBHOOKS"]);

  const result = await rest.runMethod(
    "get",
    endpoints.CHANNEL_WEBHOOKS(channelId),
  );

  return result as DiscordWebhook[];
}
