import { Bot } from "../../../bot.ts";
import { DiscordenoMember, DiscordenoUser } from "../../../transformers/member.ts";
import { GetScheduledEventUsers } from "../../../types/guilds/scheduledEvents.ts";
import { GuildMember } from "../../../types/members/guildMember.ts";
import { User } from "../../../types/users/user.ts";
import { Collection } from "../../../util/collection.ts";

export async function getScheduledEventUsers(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: GetScheduledEventUsers & { withMember?: false }
): Promise<Collection<bigint, DiscordenoUser>>;
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: GetScheduledEventUsers & { withMember: true }
): Promise<Collection<bigint, { user: DiscordenoUser; member: DiscordenoMember }>>;
export async function getScheduledEventUsers(
  bot: Bot,
  guildId: bigint,
  eventId: bigint,
  options?: GetScheduledEventUsers
): Promise<
  Collection<bigint, DiscordenoUser> | Collection<bigint, { user: DiscordenoUser; member: DiscordenoMember }>
> {
  // TODO: validate limit
  // TODO: is the guild member omit user

  const result = await bot.rest.runMethod<({ user: User, member?: GuildMember })[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.GUILD_SCHEDULED_EVENT_USERS(guildId, eventId),
    {
      limit: options?.limit,
      with_members: options?.withMember,
    }
  );

  if (!options?.withMember) {
    return new Collection(
      result.map((res) => {
        const user = bot.transformers.user(bot, res.user);
        return [user.id, user];
      })
    );
  }

  return new Collection(
    result.map((res) => {
      const user = bot.transformers.user(bot, res.user);
      const member = bot.transformers.member(bot, res.member!, guildId, user.id);

      return [user.id, { member, user }];
    })
  );
}
