import { BigString, Bot } from "../deps.ts";

/**
 * Move a member from a voice channel to another.
 */
export function moveMember(
  bot: Bot,
  guildId: BigString,
  memberId: BigString,
  channelId: BigString,
) {
  return bot.helpers.editMember(guildId, memberId, { channelId });
}
