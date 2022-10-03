import type { Bot } from "../../bot.ts";
import { DiscordBan } from "../../types/discord.ts";
import { BigString } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";
import { Ban } from "./getBan.ts";

/**
 * Gets the list of bans for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the list of bans for.
 * @param options - The parameters for the fetching of the list of bans.
 * @returns A collection of {@link Ban} objects assorted by user ID.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * Users are ordered by their IDs in _ascending_ order.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-bans}
 */
export async function getBans(bot: Bot, guildId: BigString, options?: GetBans): Promise<Collection<bigint, Ban>> {
  const results = await bot.rest.runMethod<DiscordBan[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_BANS(guildId, options),
  );

  return new Collection(
    results.map<[bigint, Ban]>((result) => {
      const user = bot.transformers.user(bot, result.user);
      return [
        user.id,
        {
          reason: result.reason ?? undefined,
          user: user,
        },
      ];
    }),
  );
}

export interface GetBans {
  /** Number of users to return (up to maximum 1000). Default: 1000 */
  limit?: number;
  /** Consider only users before given user id */
  before?: BigString;
  /** Consider only users after given user id */
  after?: BigString;
}
