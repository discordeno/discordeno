import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleThreadDelete(data: DiscordGatewayPayload) {
  const payload = data.d as Channel;

  const cachedChannel = await cacheHandlers.get("threads", snowflakeToBigint(payload.id));
  if (!cachedChannel) return;

  await cacheHandlers.delete("threads", snowflakeToBigint(payload.id));
  await cacheHandlers.forEach("DELETE_MESSAGES_FROM_CHANNEL", { channelId: snowflakeToBigint(payload.id) });

  eventHandlers.threadDelete?.(cachedChannel);
}
