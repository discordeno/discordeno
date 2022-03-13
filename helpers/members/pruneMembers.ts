import type { Bot } from "../../bot.ts";

/**
 * Begin a prune operation. Requires the KICK_MEMBERS permission. Returns an object with one 'pruned' key indicating the number of members that were removed in the prune operation. For large guilds it's recommended to set the computePruneCount option to false, forcing 'pruned' to null. Fires multiple Guild Member Remove Gateway events.
 *
 * By default, prune will not remove users with roles. You can optionally include specific roles in your prune by providing the roles (resolved to include_roles internally) parameter. Any inactive user that has a subset of the provided role(s) will be included in the prune and users with additional roles will not.
 */
export async function pruneMembers(bot: Bot, guildId: bigint, options: BeginGuildPrune) {
  if (options.days && options.days < 1) throw new Error(bot.constants.Errors.PRUNE_MIN_DAYS);
  if (options.days && options.days > 30) throw new Error(bot.constants.Errors.PRUNE_MAX_DAYS);

  const result = await bot.rest.runMethod<{ pruned: number }>(
    bot.rest,
    "post",
    bot.constants.endpoints.GUILD_PRUNE(guildId),
    {
      days: options.days,
      compute_prune_count: options.computePruneCount,
      include_roles: options.includeRoles,
    },
  );

  return result.pruned;
}

/** https://discord.com/developers/docs/resources/guild#begin-guild-prune */
export interface BeginGuildPrune {
  /** Number of days to prune (1 or more), default: 7 */
  days?: number;
  /** Whether 'pruned' is returned, discouraged for large guilds, default: true */
  computePruneCount?: boolean;
  /** Role(s) ro include, default: none */
  includeRoles?: string[];
}
