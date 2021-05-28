import { editMember } from "./edit_member.ts";

/** Kicks a member from a voice channel */
export function disconnectMember(guildId: bigint, memberId: bigint) {
  return editMember(guildId, memberId, { channelId: null });
}
