import { Bot } from "../deps.ts";

/** Kicks a member from a voice channel */
export function disconnectMember(bot: Bot, guildId: bigint, memberId: bigint) {
  return bot.helpers.editMember(guildId, memberId, { channelId: null });
}
