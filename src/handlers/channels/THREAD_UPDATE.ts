// import { eventHandlers } from "../../bot.ts";
// import { cacheHandlers } from "../../cache.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
// import { channelToThread } from "../../util/transformers/channel_to_thread.ts";

export async function handleThreadUpdate(data: DiscordGatewayPayload) {
  // const payload = data.d as Channel;
  // const oldThread = await cacheHandlers.get("threads", snowflakeToBigint(payload.id));
  // if (!oldThread) return;

  // const thread = channelToThread(payload);
  // await cacheHandlers.set("threads", thread.id, thread);

  // eventHandlers.threadUpdate?.(thread, oldThread);
}
