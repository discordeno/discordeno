import { Bot, Collection, DiscordMemberWithUser, ListGuildMembers, Member } from "../deps.ts";

/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembersPaginated(
  bot: Bot,
  guildId: bigint,
  options: ListGuildMembers,
) {
  const members = new Collection<bigint, Member>();

  let membersLeft = options?.limit ?? 1000;
  let loops = 1;
  while (
    (options?.limit ?? 1000) > members.size &&
    membersLeft > 0
  ) {
    bot.events.debug("Running while loop in getMembers function.");

    if (options?.limit && options.limit > 1000) {
      console.log(
        `Paginating get members from REST. #${loops} / ${
          Math.ceil(
            (options?.limit ?? 1) / 1000,
          )
        }`,
      );
    }

    const result = await bot.rest.runMethod<DiscordMemberWithUser[]>(
      bot.rest,
      "get",
      `${bot.constants.endpoints.GUILD_MEMBERS(guildId)}?limit=${membersLeft > 1000 ? 1000 : membersLeft}${
        options?.after ? `&after=${options.after}` : ""
      }`,
    );

    const discordenoMembers = result.map((member) =>
      bot.transformers.member(
        bot,
        member,
        guildId,
        bot.transformers.snowflake(member.user.id),
      )
    );

    if (!discordenoMembers.length) break;

    discordenoMembers.forEach((member) => {
      bot.events.debug(`Running forEach loop in get_members file.`);
      members.set(member.id, member);
    });

    options = {
      limit: options?.limit,
      after: discordenoMembers[discordenoMembers.length - 1].id.toString(),
    };

    membersLeft -= 1000;

    loops++;
  }

  return members;
}
