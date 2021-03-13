import { editMember } from "./edit_member.ts";

/**
 * Move a member from a voice channel to another.
 * @param guildID the id of the guild which the channel exists in
 * @param memberID the id of the member to move.
 * @param channelID id of channel to move user to (if they are connected to voice)
 */
export function moveMember(
  guildID: string,
  memberID: string,
  channelID: string,
) {
  return editMember(guildID, memberID, { channel_id: channelID });
}
