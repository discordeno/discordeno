import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Returns a guild member object for the specified user.
 *
 * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
 */
export async function getMember(
  guildId: string,
  id: string,
  options?: { force?: boolean },
) {
  const guild = await cacheHandlers.get("guilds", guildId);
  if (!guild && !options?.force) return;

  const data = (await RequestManager.get(
    endpoints.GUILD_MEMBER(guildId, id),
  )) as MemberCreatePayload;

  const memberStruct = await structures.createMemberStruct(data, guildId);
  await cacheHandlers.set("members", memberStruct.id, memberStruct);

  return memberStruct;
}
