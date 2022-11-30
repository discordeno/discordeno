import { BigString, Bot } from "../deps.ts";

/** Kicks a member from a voice channel */
export function disconnectMember(bot: Bot, guildId: BigString, memberId: BigString) {
  return bot.helpers.editMember(guildId, memberId, { channelId: null });
}
