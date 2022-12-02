import { BigString, Bot, Member } from '@discordeno/bot'

/** Kicks a member from a voice channel */
export async function disconnectMember (
  bot: Bot,
  guildId: BigString,
  memberId: BigString
): Promise<Member> {
  return await bot.helpers.editMember(guildId, memberId, { channelId: null })
}
