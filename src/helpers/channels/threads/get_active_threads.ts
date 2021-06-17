import { rest } from "../../../rest/rest.ts";
import { ListActiveThreads } from "../../../types/channels/threads/list_active_threads.ts";
import { snowflakeToBigint } from "../../../util/bigint.ts";
import { Collection } from "../../../util/collection.ts";
import { endpoints } from "../../../util/constants.ts";
import { requireBotChannelPermissions } from "../../../util/permissions.ts";
import { channelToThread } from "../../../util/transformers/channel_to_thread.ts";

/** Returns all active threads in the channel, including public and private threads. Threads are ordered by their id, in descending order. Requires the VIEW_CHANNEL permission. */
export async function getActiveThreads(channelId: bigint) {
  await requireBotChannelPermissions(channelId, ["VIEW_CHANNEL"]);

  const result = (await rest.runMethod("get", endpoints.THREAD_ACTIVE(channelId))) as ListActiveThreads;

  const threads = new Collection(
    result.threads.map((t) => {
      const ddThread = channelToThread(t);
      return [ddThread.id, ddThread];
    })
  );

  for (const member of result.members) {
    const thread = threads.get(snowflakeToBigint(member.id));
    thread?.members.set(snowflakeToBigint(member.userId), {
      userId: snowflakeToBigint(member.userId),
      flags: member.flags,
      joinTimestamp: Date.parse(member.joinTimestamp),
    });
  }

  return threads;
}
