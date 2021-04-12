import { cacheHandlers } from "../../cache.ts";
import { DiscordenoMember } from "../../structures/member.ts";
import { Collection } from "../../util/collection.ts";

/** Returns guild member objects for the specified user by their nickname/username.
 *
 * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
 */
export async function getMembersByQuery(
  guildId: string,
  name: string,
  limit = 1,
) {
  const guild = await cacheHandlers.get("guilds", guildId);
  if (!guild) return;

  return new Promise((resolve) => {
    return requestAllMembers(guild.id, guild.shardId, resolve, {
      query: name,
      limit,
    });
  }) as Promise<Collection<string, DiscordenoMember>>;
}
