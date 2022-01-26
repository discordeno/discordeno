import {
  Bot,
  Collection,
  DiscordenoMember,
  GuildMemberWithUser,
  ListGuildMembers,
} from "../deps.ts";

/**
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembersPaginated(
  bot: Bot,
  guildId: bigint,
  options: ListGuildMembers & { memberCount: number }
) {
  const members = new Collection<bigint, DiscordenoMember>();

  let membersLeft = options?.limit ?? options.memberCount;
  let loops = 1;
  while (
    (options?.limit ?? options.memberCount) > members.size &&
    membersLeft > 0
  ) {
    bot.events.debug("Running while loop in getMembers function.");

    if (options?.limit && options.limit > 1000) {
      console.log(
        `Paginating get members from REST. #${loops} / ${Math.ceil(
          (options?.limit ?? 1) / 1000
        )}`
      );
    }

    const result = await bot.rest.runMethod<GuildMemberWithUser[]>(
      bot.rest,
      "get",
      `${bot.constants.endpoints.GUILD_MEMBERS(guildId)}?limit=${
        membersLeft > 1000 ? 1000 : membersLeft
      }${options?.after ? `&after=${options.after}` : ""}`
    );

    const discordenoMembers = result.map((member) =>
      bot.transformers.member(
        bot,
        member,
        guildId,
        bot.transformers.snowflake(member.user.id)
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
      memberCount: options.memberCount,
    };

    membersLeft -= 1000;

    loops++;
  }

  return members;
}
