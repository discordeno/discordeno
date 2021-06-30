import {
  ThreadMembersUpdate,
  ThreadMembersUpdateModified,
} from "../../types/channels/threads/thread_members_update.ts";
import { snowflakeToBigint } from "../bigint.ts";
import { threadMemberModified } from "./thread_member_modified.ts";

export function threadMembersUpdateModified(data: ThreadMembersUpdate) {
  return {
    ...data,
    id: snowflakeToBigint(data.id),
    guildId: snowflakeToBigint(data.guildId),
    addedMembers: data.addedMembers?.map((member) => threadMemberModified(member)) || [],
    removedMemberIds: data.removedMemberIds?.map((id) => snowflakeToBigint(id)) || [],
  } as ThreadMembersUpdateModified;
}
