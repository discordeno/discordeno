import type { Bot } from "../../bot.ts";
import { GatewayIntents, GatewayOpcodes } from "../../types/shared.ts";
import { calculateShardId } from "../../util/calculateShardId.ts";

/**
 * Highly recommended to use this function to fetch members instead of getMember from REST.
 * REST: 50/s global(across all shards) rate limit with ALL requests this included
 * GW(this function): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is now 960/m.
 */
export function fetchMembers(
  bot: Bot,
  guildId: bigint,
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

  const shardId = calculateShardId(bot.gateway, guildId);

  return new Promise((resolve) => {
    const nonce = `${guildId}-${Date.now()}`;
    bot.cache.fetchAllMembersProcessingRequests.set(nonce, resolve);

    const shard = bot.gateway.manager.shards.get(shardId);
    if (!shard) {
      throw new Error(`Shard (id: ${shardId}) not found.`);
    }

    shard.send({
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

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildId: bigint;
  /** String that username starts with, or an empty string to return all members */
  query?: string;
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean;
  /** Used to specify which users you wish to fetch */
  userIds?: bigint[];
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string;
}
