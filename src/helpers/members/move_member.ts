import type { Bot } from "../../bot.ts";

/**
 * Move a member from a voice channel to another.
 * @param bot the bot
 * @param guildId the id of the guild which the channel exists in
 * @param memberId the id of the member to move.
 * @param channelId id of channel to move user to (if they are connected to voice)
 */
export function moveMember(bot: Bot, guildId: bigint, memberId: bigint, channelId: bigint) {
  return bot.helpers.editMember(guildId, memberId, { channelId });
}
