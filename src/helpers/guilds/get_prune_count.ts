import type { GetGuildPruneCountQuery } from "../../types/guilds/get_guild_prune_count.ts";
import type { Bot } from "../../bot.ts";

/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
export async function getPruneCount(bot: Bot, guildId: bigint, options?: GetGuildPruneCountQuery) {
  if (options?.days && options.days < 1) throw new Error(bot.constants.Errors.PRUNE_MIN_DAYS);
  if (options?.days && options.days > 30) {
    throw new Error(bot.constants.Errors.PRUNE_MAX_DAYS);
  }

  await bot.utils.requireBotGuildPermissions(guildId, ["KICK_MEMBERS"]);

  const result = await bot.rest.runMethod(bot.rest,"get", bot.constants.endpoints.GUILD_PRUNE(guildId), options ? {
    days: options.days,
    include_roles: options.includeRoles
  } : {});

  return result.pruned as number;
}
