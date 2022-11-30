import type { Bot } from "../../bot.ts";
import { BigString, GatewayIntents, GatewayOpcodes } from "../../types/shared.ts";
import { calculateShardId } from "../../util/calculateShardId.ts";

/**
 * Fetches the list of members for a guild over the gateway.
 *
 * @param bot - The bot instance to use to make the requests.
 * @param guildId - The ID of the guild to get the list of members for.
 * @param options - The parameters for the fetching of the members.
 *
 * @remarks
 * If requesting the entire member list:
 * - Requires the `GUILD_MEMBERS` intent.
 *
 * If requesting presences ({@link RequestGuildMembers.presences | presences} set to `true`):
 * - Requires the `GUILD_PRESENCES` intent.
 *
 * If requesting a prefix ({@link RequestGuildMembers.query | query} non-`undefined`):
 * - Returns a maximum of 100 members.
 *
 * If requesting a users by ID ({@link RequestGuildMembers.userIds | userIds} non-`undefined`):
 * - Returns a maximum of 100 members.
 *
 * Fires a _Guild Members Chunk_ gateway event for every 1000 members fetched.
 *
 * @see {@link https://discord.com/developers/docs/topics/gateway#request-guild-members}
 */
export function fetchMembers(
  bot: Bot,
  guildId: BigString,
  options?: Omit<RequestGuildMembers, "guildId">,
): Promise<void> {
  // You can request 1 member without the intent
  // Check if intents is not 0 as proxy ws won't set intents in other instances
  if (bot.intents && (!options?.limit || options.limit > 1) && !(bot.intents & GatewayIntents.GuildMembers)) {
    throw new Error(bot.constants.Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  if (options?.userIds?.length) {
    options.limit = options.userIds.length;
  }

  const shardId = calculateShardId(bot.gateway, bot.transformers.snowflake(guildId));

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
  });
}

/** https://discord.com/developers/docs/topics/gateway#request-guild-members */
export interface RequestGuildMembers {
  /** id of the guild to get members for */
  guildId: BigString;
  /** String that username starts with, or an empty string to return all members */
  query?: string;
  /** Maximum number of members to send matching the query; a limit of 0 can be used with an empty string query to return all members */
  limit: number;
  /** Used to specify if we want the presences of the matched members */
  presences?: boolean;
  /** Used to specify which users you wish to fetch */
  userIds?: BigString[];
  /** Nonce to identify the Guild Members Chunk response */
  nonce?: string;
}
