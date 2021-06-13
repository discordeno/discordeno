import { Channel } from "../types/channels/channel.ts";
import { snowflakeToBigint } from "./bigint.ts";

export function channelToThread(channel: Channel) {
  return {
    id: snowflakeToBigint(channel.id),
    channelId: snowflakeToBigint(channel.parentId!),
    memberCount: channel.memberCount,
    messageCount: channel.messageCount,
    archived: channel.threadMetadata?.archived || false,
    archiveTimestamp: channel.threadMetadata?.archiveTimestamp
      ? Date.parse(channel.threadMetadata.archiveTimestamp)
      : undefined,
    archiverId: channel.threadMetadata?.archiverId ? snowflakeToBigint(channel.threadMetadata.archiverId) : undefined,
    autoArchiveDuration: channel.threadMetadata?.autoArchiveDuration || 0,
    locked: channel.threadMetadata?.locked || false,
  };
}

export type Thread = ReturnType<typeof channelToThread>;
