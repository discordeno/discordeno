import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { ThreadMember } from "../../types/channels/threads/thread_member.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleThreadMemberUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as ThreadMember;
  // The id field is omitted from the thread member dispoatched within the GUILD_CREATE gateway event.
  const thread = await cacheHandlers.get("channels", snowflakeToBigint(payload.id!));
  if (!thread) return;

  thread.member = payload;

  await cacheHandlers.set("channels", thread.id, thread);

  eventHandlers.threadMemberUpdate?.(payload);
}
