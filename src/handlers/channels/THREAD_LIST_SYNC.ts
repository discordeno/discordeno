import { ThreadListSync } from "../../types/channels/threads/threadListSync.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { Collection } from "../../util/collection.ts";

export async function handleThreadListSync(data: DiscordGatewayPayload) {
  // const payload = data.d as ThreadListSync;
  // const threads = await Promise.all(
  //   payload.threads.map(async (thread) => {
  //     const threadData = channelToThread(thread);
  //     await cacheHandlers.set("threads", threadData.id, threadData);
  //     return threadData;
  //   })
  // );
  // eventHandlers.threadListSync?.(
  //   new Collection(threads.map((t) => [t.id, t])),
  //   payload.members.map((member) => threadMemberModified(member)),
  //   snowflakeToBigint(payload.guildId)
  // );
}
