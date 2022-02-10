import type { RequestGuildMembers } from "../../types/members/requestGuildMembers.ts";
import type { Bot } from "../../bot.ts";
import { GatewayIntents } from "../../types/gateway/gatewayIntents.ts";
import { GatewayOpcodes } from "../../types/codes/gatewayOpcodes.ts";

/**
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
 */
export function fetchMembers(
  bot: Bot,
  guildId: bigint,
  shardId: number,
  options?: Omit<RequestGuildMembers, "guildId">,
) {
  // You can request 1 member without the intent
  // Check if intents is not 0 as proxy ws won't set intents in other instances
  if (bot.intents && (!options?.limit || options.limit > 1) && !(bot.intents & GatewayIntents.GuildMembers)) {
    throw new Error(bot.constants.Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  if (options?.userIds?.length) {
    options.limit = options.userIds.length;
  }

  return new Promise((resolve) => {
    const nonce = `${guildId}-${Date.now()}`;
    bot.cache.fetchAllMembersProcessingRequests.set(nonce, resolve);

    bot.gateway.sendShardMessage(bot.gateway, shardId, {
      op: GatewayOpcodes.RequestGuildMembers,
      d: {
        guild_id: guildId.toString(),
        // If a query is provided use it, OR if a limit is NOT provided use ""
        query: options?.query || (options?.limit ? undefined : ""),
        limit: options?.limit || 0,
        presences: options?.presences || false,
        user_ids: options?.userIds?.map((id) => id.toString()),
        nonce,
      },
    });
  }) as Promise<void>;
}
