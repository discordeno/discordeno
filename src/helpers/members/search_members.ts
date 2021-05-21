import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { DiscordenoMember } from "../../structures/member.ts";
import { structures } from "../../structures/mod.ts";
import { Errors } from "../../types/discordeno/errors.ts";
import type { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import type { SearchGuildMembers } from "../../types/members/search_guild_members.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * ⚠️ BEGINNER DEVS!! YOU SHOULD ALMOST NEVER NEED THIS AND YOU CAN GET FROM cache.members.filter()
 * @param query Query string to match username(s) and nickname(s) against
 */
export async function searchMembers(
  guildId: bigint,
  query: string,
  options?: Omit<SearchGuildMembers, "query"> & { cache?: boolean }
) {
  if (options?.limit) {
    if (options.limit < 1) throw new Error(Errors.MEMBER_SEARCH_LIMIT_TOO_LOW);
    if (options.limit > 1000) {
      throw new Error(Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH);
    }
  }

  const result = await rest.runMethod<GuildMemberWithUser[]>("get", endpoints.GUILD_MEMBERS_SEARCH(guildId), {
    ...options,
    query,
  });

  const members = await Promise.all(
    result.map(async (member) => {
      const discordenoMember = await structures.createDiscordenoMember(member, guildId);
      if (options?.cache) {
        await cacheHandlers.set("members", discordenoMember.id, discordenoMember);
      }

      return discordenoMember;
    })
  );

  return new Collection<bigint, DiscordenoMember>(members.map((member) => [member.id, member]));
}
