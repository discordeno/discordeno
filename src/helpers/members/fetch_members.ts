import { identifyPayload } from "../../bot.ts";
import { Member } from "../../structures/mod.ts";
import { DiscordGatewayIntents } from "../../types/gateway/gateway_intents.ts";
import { Errors } from "../../types/misc/errors.ts";
import { Collection } from "../../util/collection.ts";
import { requestAllMembers } from "../../ws/shard_manager.ts";
import { DiscordGatewayIntents } from "../../types/gateway/gateway_intents.ts";
import { Errors } from "../../types/misc/errors.ts";

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.get()
 *
 * ADVANCED:
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
 */
export function fetchMembers(
  guildId: string,
  shardId: number,
  options?: FetchMembersOptions,
) {
  // You can request 1 member without the intent
  if (
    (!options?.limit || options.limit > 1) &&
    !(identifyPayload.intents && DiscordGatewayIntents.GUILD_MEMBERS)
  ) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  if (options?.userIds?.length) {
    options.limit = options.userIds.length;
  }

  return new Promise((resolve) => {
    return requestAllMembers(guildId, shardId, resolve, options);
  }) as Promise<Collection<string, Member>>;
}
