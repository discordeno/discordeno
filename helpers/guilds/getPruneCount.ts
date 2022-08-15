import type { Bot } from "../../bot.ts";

/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
export async function getPruneCount(bot: Bot, guildId: bigint, options?: GetGuildPruneCountQuery) {
  if (options?.days && options.days < 1) throw new Error(bot.constants.Errors.PRUNE_MIN_DAYS);
  if (options?.days && options.days > 30) throw new Error(bot.constants.Errors.PRUNE_MAX_DAYS);

  const result = await bot.rest.runMethod(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_PRUNE(guildId),
  );

  return result.pruned as number;
}

/** https://discord.com/developers/docs/resources/guild#get-guild-prune-count */
export interface GetGuildPruneCountQuery {
  /** Number of days to count prune for (1 or more), default: 7 */
  days?: number;
  /** Role(s) to include, default: none */
  includeRoles?: string | string[];
}
