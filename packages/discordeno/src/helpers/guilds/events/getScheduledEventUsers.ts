import { Bot } from "../../../bot.ts";
import { Member, User } from "../../../transformers/member.ts";
import { DiscordMember, DiscordUser } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";

// TODO: This endpoint discards certain data from the result.
//  Create `ScheduledEventUser` type and parse the data to it.

/**
 * Gets the list of subscribers to a scheduled event from a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the subscribers to the scheduled event from.
 * @param eventId - The ID of the scheduled event to get the subscribers of.
 * @param options - The parameters for the fetching of the subscribers.
 * @returns A collection of {@link User} objects assorted by user ID.
 *
 * @remarks
 * Requires the `MANAGE_EVENTS` permission.
 *
 * Users are ordered by their IDs in _ascending_ order.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users}
 */
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: BigString,
  eventId: BigString,
  options?: GetScheduledEventUsers & { withMember?: false },
): Promise<Collection<bigint, User>>;
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: BigString,
  eventId: BigString,
  options?: GetScheduledEventUsers & { withMember: true },
): Promise<Collection<bigint, { user: User; member: Member }>>;
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: BigString,
  eventId: BigString,
  options?: GetScheduledEventUsers,
): Promise<
  Collection<bigint, User> | Collection<bigint, { user: User; member: Member }>
> {
  let url = bot.constants.routes.GUILD_SCHEDULED_EVENT_USERS(guildId, eventId, options);

  if (options) {
    url = "?";

    if (options.limit) url += `limit=${options.limit}`;
    if (options.withMember) url += `&with_member=${options.withMember}`;
    if (options.after) url += `&after=${options.after}`;
    if (options.before) url += `&before=${options.before}`;
  }

  const results = await bot.rest.runMethod<{ user: DiscordUser; member?: DiscordMember }[]>(
    bot.rest,
    "GET",
    url,
  );

  if (!options?.withMember) {
    return new Collection(
      results.map((result) => {
        const user = bot.transformers.user(bot, result.user);
        return [user.id, user];
      }),
    );
  }

  const id = bot.transformers.snowflake(guildId);

  return new Collection(
    results.map((result) => {
      const user = bot.transformers.user(bot, result.user);
      const member = bot.transformers.member(bot, result.member!, id, user.id);

      return [user.id, { member, user }];
    }),
  );
}

export interface GetScheduledEventUsers {
  /** number of users to return (up to maximum 100), defaults to 100 */
  limit?: number;
  /** whether to also have member objects provided, defaults to false */
  withMember?: boolean;
  /** consider only users before given user id */
  before?: BigString;
  /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
  after?: BigString;
}
