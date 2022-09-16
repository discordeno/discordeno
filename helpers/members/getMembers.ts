import type { Bot } from "../../bot.ts";
import { Member } from "../../transformers/member.ts";
import { DiscordMemberWithUser } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";

// TODO: make options optional

/**
 * Gets the list of members for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the list of members for.
 * @param options - The parameters for the fetching of the members.
 * @returns A collection of {@link Member} objects assorted by user ID.
 *
 * @remarks
 * Requires the `GUILD_MEMBERS` intent.
 *
 * ⚠️ It is not recommended to use this endpoint with very large bots. Instead, opt to use `fetchMembers()`:
 * REST communication only permits 50 requests to be made per second, while gateways allow for up to 120 requests
 * per minute per shard. For more information, read {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#list-guild-members}
 * @see {@link https://discord.com/developers/docs/topics/gateway#request-guild-members}
 * @see {@link https://discord.com/developers/docs/topics/rate-limits#rate-limits}
 */
export async function getMembers(
  bot: Bot,
  guildId: BigString,
  options: ListGuildMembers,
): Promise<Collection<bigint, Member>> {
  const results = await bot.rest.runMethod<DiscordMemberWithUser[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_MEMBERS(guildId, options),
  );

  const id = bot.transformers.snowflake(guildId);

  return new Collection(
    results.map((result) => {
      const member = bot.transformers.member(bot, result, id, bot.transformers.snowflake(result.user.id));
      return [member.id, member];
    }),
  );
}

/** https://discord.com/developers/docs/resources/guild#list-guild-members */
export interface ListGuildMembers {
  /** Max number of members to return (1-1000). Default: 1000 */
  limit?: number;
  /** The highest user id in the previous page. Default: 0 */
  after?: string;
}
