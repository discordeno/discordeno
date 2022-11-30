import type { Bot } from "../../bot.ts";
import { BigString } from "../../types/shared.ts";

interface DiscordPrunedCount {
  pruned: number;
}

/**
 * Gets the number of members that would be kicked from a guild during pruning.
 *
 * @param bot - The bot instance used to make the request
 * @param guildId - The ID of the guild to get the prune count of.
 * @param options - The parameters for the fetching of the prune count.
 * @returns A number indicating the number of members that would be kicked.
 *
 * @remarks
 * Requires the `KICK_MEMBERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-prune-count}
 */
export async function getPruneCount(bot: Bot, guildId: BigString, options?: GetGuildPruneCountQuery): Promise<number> {
  if (options?.days && options.days < 1) throw new Error(bot.constants.Errors.PRUNE_MIN_DAYS);
  if (options?.days && options.days > 30) throw new Error(bot.constants.Errors.PRUNE_MAX_DAYS);

  const result = await bot.rest.runMethod<DiscordPrunedCount>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_PRUNE(guildId),
  );

  return result.pruned;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
  /** Number of days to count prune for (1 or more), default: 7 */
  days?: number;
  /** Role(s) to include, default: none */
  includeRoles?: string | string[];
}
