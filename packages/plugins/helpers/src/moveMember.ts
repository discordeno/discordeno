import { BigString, Bot } from '../deps.js'

/**
 * Move a member from a voice channel to another.
 */
export async function moveMember (
  bot: Bot,
  guildId: BigString,
  memberId: BigString,
  channelId: BigString
) {
  return await bot.helpers.editMember(guildId, memberId, { channelId })
}
