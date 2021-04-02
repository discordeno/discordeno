import { identifyPayload } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { Member, structures } from "../../structures/mod.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.get()
 *
 * ADVANCED:
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembers(guildId: string, options?: GetMemberOptions) {
  if (!(identifyPayload.intents && Intents.GUILD_MEMBERS)) {
    throw new Error(Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  const guild = await cacheHandlers.get("guilds", guildId);
  if (!guild) throw new Error(Errors.GUILD_NOT_FOUND);

  const members = new Collection<string, Member>();

  let membersLeft = options?.limit ?? guild.memberCount;
  let loops = 1;
  while (
    (options?.limit ?? guild.memberCount) > members.size &&
    membersLeft > 0
  ) {
    if (options?.limit && options.limit > 1000) {
      console.log(
        `Paginating get members from REST. #${loops} / ${
          Math.ceil(
            (options?.limit ?? 1) / 1000,
          )
        }`,
      );
    }

    const result =
      (await rest.runMethod(
        "get",
        `${endpoints.GUILD_MEMBERS(guildId)}?limit=${
          membersLeft > 1000
            ? 1000
            : membersLeft
        }${
          options?.after
            ? `&after=${options.after}`
            : ""
        }`,
      )) as MemberCreatePayload[];

    const memberStructures = await Promise.all(
      result.map(async (member) => {
        const memberStruct = await structures.createMemberStruct(
          member,
          guildId,
        );

        await cacheHandlers.set("members", memberStruct.id, memberStruct);

        return memberStruct;
      }),
    ) as Member[];

    if (!memberStructures.length) break;

    memberStructures.forEach((member) => members.set(member.id, member));

    options = {
      limit: options?.limit,
      after: memberStructures[memberStructures.length - 1].id,
    };

    membersLeft -= 1000;

    loops++;
  }

  return members;
}
