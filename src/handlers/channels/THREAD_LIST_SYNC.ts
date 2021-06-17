import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { ThreadListSync } from "../../types/channels/threads/thread_list_sync.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { channelToThread } from "../../util/transformers/channel_to_thread.ts";
import { Collection } from "../../util/collection.ts";
import { threadMemberModified } from "../../util/transformers/thread_member_modified.ts";

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
    new Collection(threads.map((t) => [t.id, channelToThread(t)])),
    payload.members.map((member) => threadMemberModified(member)),
    snowflakeToBigint(payload.guildId)
  );
}
