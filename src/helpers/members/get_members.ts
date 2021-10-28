import { DiscordGatewayIntents } from "../../types/gateway/gateway_intents.ts";
import type { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import type { ListGuildMembers } from "../../types/members/list_guild_members.ts";
import type { Bot } from "../../bot.ts";
import { Collection } from "../../util/collection.ts";
import type { DiscordenoMember } from "../../transformers/member.ts";

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.get()
 *
 * ADVANCED:
 * Highly recommended to **NOT** use this function to get members instead use fetchMembers().
 * REST(this function): 50/s global(across all shards) rate limit with ALL requests this included
 * GW(fetchMembers): 120/m(PER shard) rate limit. Meaning if you have 8 shards your limit is 960/m.
 */
export async function getMembers(bot: Bot, guildId: bigint, options?: ListGuildMembers & { addToCache?: boolean }) {
  // Check if intents is not 0 as proxy ws won't set intents in other instances
  if (
    bot.intents &&
    !(bot.intents & DiscordGatewayIntents.GuildMembers)
  ) {
    throw new Error(bot.constants.Errors.MISSING_INTENT_GUILD_MEMBERS);
  }

  const guild = await bot.cache.guilds.get(guildId);
  if (!guild) throw new Error(bot.constants.Errors.GUILD_NOT_FOUND);

  const members = new Collection<bigint, DiscordenoMember>();

  let membersLeft = options?.limit ?? guild.memberCount;
  let loops = 1;
  while ((options?.limit ?? guild.memberCount) > members.size && membersLeft > 0) {
    bot.events.debug("Running while loop in getMembers function.");

    if (options?.limit && options.limit > 1000) {
      console.log(`Paginating get members from REST. #${loops} / ${Math.ceil((options?.limit ?? 1) / 1000)}`);
    }

    const result = await bot.rest.runMethod<GuildMemberWithUser[]>(
      bot.rest,
      "get",
      `${bot.constants.endpoints.GUILD_MEMBERS(guildId)}?limit=${membersLeft > 1000 ? 1000 : membersLeft}${
        options?.after ? `&after=${options.after}` : ""
      }`
    );

    const discordenoMembers = await Promise.all(
      result.map(async (member) => {
        const discordenoMember = bot.transformers.member(bot, member, guildId, bot.transformers.snowflake(member.user.id));

        if (options?.addToCache !== false) {
          await bot.cache.members.set(discordenoMember.id, discordenoMember);
        }

        return discordenoMember;
      })
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
