import { Bot } from "../deps.ts";

/**
 * Move a member from a voice channel to another.
 */
export function moveMember(
  bot: Bot,
  guildId: bigint,
  memberId: bigint,
  channelId: bigint
) {
  return bot.helpers.editMember(guildId, memberId, { channelId });
}
