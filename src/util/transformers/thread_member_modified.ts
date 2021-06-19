import { ThreadMember, ThreadMemberModified } from "../../types/channels/threads/thread_member.ts";
import { snowflakeToBigint } from "../bigint.ts";

export function threadMemberModified(member: ThreadMember) {
  return {
    ...member,
    id: snowflakeToBigint(member.id!),
    userId: snowflakeToBigint(member.userId!),
    joinTimestamp: Date.parse(member.joinTimestamp),
  } as ThreadMemberModified;
}
