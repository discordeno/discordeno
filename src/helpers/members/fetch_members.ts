import { identifyPayload } from "../../bot.ts";
import { Guild, Member } from "../../structures/mod.ts";
import { Errors, FetchMembersOptions, Intents } from "../../types/mod.ts";
import { Collection } from "../../util/collection.ts";
import { requestAllMembers } from "../../ws/shard_manager.ts";

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.get()
 *
 * ADVANCED:
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
 */
export function fetchMembers(guild: Guild, options?: FetchMembersOptions) {
  // You can request 1 member without the intent
  if (
    (!options?.limit || options.limit > 1) &&
    !(identifyPayload.intents && Intents.GUILD_MEMBERS)
  ) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  if (options?.userIDs?.length) {
    options.limit = options.userIDs.length;
  }

  return new Promise((resolve) => {
    return requestAllMembers(guild, resolve, options);
  }) as Promise<Collection<string, Member>>;
}
