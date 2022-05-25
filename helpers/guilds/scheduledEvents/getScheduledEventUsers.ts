import { Bot } from "../../../bot.ts";
import { Member, User } from "../../../transformers/member.ts";
import { DiscordMember, DiscordUser } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

export async function getScheduledEventUsers(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: GetScheduledEventUsers & { withMember?: false },
): Promise<Collection<bigint, User>>;
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: GetScheduledEventUsers & { withMember: true },
): Promise<Collection<bigint, { user: User; member: Member }>>;
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
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

  const result = await bot.rest.runMethod<{ user: DiscordUser; member?: DiscordMember }[]>(
    bot.rest,
    "GET",
    url,
  );

  if (!options?.withMember) {
    return new Collection(
      result.map((res) => {
        const user = bot.transformers.user(bot, res.user);
        return [user.id, user];
      }),
    );
  }

  return new Collection(
    result.map((res) => {
      const user = bot.transformers.user(bot, res.user);
      const member: Member = bot.transformers.member(bot, res.member!, guildId, user.id);

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
  before?: bigint;
  /** consider only users after given user id. If both before and after are provided, only before is respected. Fetching users in-between before and after is not supported. */
  after?: bigint;
}
