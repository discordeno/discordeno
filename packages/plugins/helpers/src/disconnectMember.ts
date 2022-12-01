import { BigString, Bot } from '../deps.js'

/** Kicks a member from a voice channel */
export async function disconnectMember (bot: Bot, guildId: BigString, memberId: BigString) {
  return await bot.helpers.editMember(guildId, memberId, { channelId: null })
}
