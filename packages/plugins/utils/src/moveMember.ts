import type { BigString, Bot, Member } from '@discordeno/bot'

/**
 * Move a member from a voice channel to another.
 */
export async function moveMember (
  bot: Bot,
  guildId: BigString,
  memberId: BigString,
  channelId: BigString
): Promise<Member> {
  return await bot.helpers.editMember(guildId, memberId, { channelId })
}
