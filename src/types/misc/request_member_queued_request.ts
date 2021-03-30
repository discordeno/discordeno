import { RequestGuildMembers } from "../guilds/request_guild_members.ts";

export interface RequestMemberQueuedRequest {
  guildID: string;
  shardID: number;
  nonce: string;
  options?: RequestGuildMembers;
}
