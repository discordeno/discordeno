import type { GuildMemberWithUser } from "../../types/members/guild_member.ts";
import type {Bot} from "../../bot.ts";
import type {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Returns a guild member object for the specified user.
 *
 * ⚠️ **ADVANCED USE ONLY: Your members will be cached in your guild most likely. Only use this when you are absolutely sure the member is not cached.**
 */
export async function getMember(bot: Bot, guildId: bigint, id: bigint, options?: { force?: boolean }) {
  const guild = await bot.cache.guilds.get(guildId);
  if (!guild && !options?.force) return;

  const data = await bot.rest.runMethod<SnakeCasedPropertiesDeep<GuildMemberWithUser>>(bot.rest,"get", bot.constants.endpoints.GUILD_MEMBER(guildId, id));

  const discordenoMember = await bot.transformers.member(bot, data, guildId);
  await bot.cache.members.set(discordenoMember.id, discordenoMember);

  return discordenoMember;
}
