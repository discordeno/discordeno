import { cacheHandlers } from "../../cache.ts";
import { Member } from "../../structures/mod.ts";
import { Collection } from "../../util/collection.ts";
import { requestAllMembers } from "../../ws/shard_manager.ts";

/** Returns guild member objects for the specified user by their nickname/username.
 *
 * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
 */
export async function getMembersByQuery(
  guildID: string,
  name: string,
  limit = 1,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  return new Promise((resolve) => {
    return requestAllMembers(guild, resolve, { query: name, limit });
  }) as Promise<Collection<string, Member>>;
}
