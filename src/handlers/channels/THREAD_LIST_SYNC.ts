import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { ThreadListSync } from "../../types/channels/threads/thread_list_sync.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { channelToThread } from "../../util/channel_to_thread.ts";
import { Collection } from "../../util/collection.ts";

export async function handleThreadListSync(data: DiscordGatewayPayload) {
  const payload = data.d as ThreadListSync;

  const threads = await Promise.all(
    payload.threads.map(async (thread) => {
      const threadData = channelToThread(thread);
      await cacheHandlers.set("threads", threadData.id, threadData);

      return threadData;
    })
  );

  eventHandlers.threadListSync?.(
    new Collection(threads.map((t) => [t.id, t])),
    payload.members,
    snowflakeToBigint(payload.guildId)
  );
}
