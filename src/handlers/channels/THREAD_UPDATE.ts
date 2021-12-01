import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleThreadUpdate(data: DiscordGatewayPayload) {
  // const payload = data.d as Channel;
  // const oldThread = await cacheHandlers.get("threads", snowflakeToBigint(payload.id));
  // if (!oldThread) return;
  // const thread = channelToThread(payload);
  // await cacheHandlers.set("threads", thread.id, thread);
  // eventHandlers.threadUpdate?.(thread, oldThread);
}
