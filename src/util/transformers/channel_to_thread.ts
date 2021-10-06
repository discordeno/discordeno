import { cache } from "../../cache.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordChannelTypes } from "../../types/channels/channel_types.ts";
import { ThreadMemberModified } from "../../types/channels/threads/thread_member.ts";
import { snowflakeToBigint } from "../bigint.ts";
import { Collection } from "../collection.ts";
import { createNewProp } from "../utils.ts";

export const threadToggles = {
  /** Whether this thread is archived. */
  archived: 1n,
  /** Whether this thread is locked. */
  locked: 2n,
};

const baseThread: Partial<DiscordenoThread> = {
  get archived() {
    return Boolean(this.bitfield! & threadToggles.archived);
  },
  get locked() {
    return Boolean(this.bitfield! & threadToggles.locked);
  },
  get isPrivate() {
    return this.type === DiscordChannelTypes.GuildPrivateThread;
  },
  get isPublic() {
    return !this.isPrivate;
  },
  get guildId() {
    return cache.channels.get(this.parentId!)!.guildId;
  },
  toJSON() {
    return {
      id: this.id?.toString(),
      type: this.type,
      parentId: this.parentId?.toString(),
      memberCount: this.memberCount,
      messageCount: this.messageCount,
      archiveTimestamp: new Date(this.archiveTimestamp!).toISOString(),
      autoArchiveDuration: this.autoArchiveDuration,
      archived: this.archived,
      locked: this.locked,
    } as Thread;
  },
};

export function channelToThread(channel: Channel) {
  let bitfield = 0n;

  if (channel.threadMetadata?.archived) bitfield |= threadToggles.archived;
  if (channel.threadMetadata?.locked) bitfield |= threadToggles.locked;

  return Object.create(baseThread, {
    name: createNewProp(channel.name),
    id: createNewProp(snowflakeToBigint(channel.id)),
    type: createNewProp(channel.type),
    parentId: createNewProp(snowflakeToBigint(channel.parentId!)),
    memberCount: createNewProp(channel.memberCount),
    messageCount: createNewProp(channel.messageCount),
    archiveTimestamp: createNewProp(
      channel.threadMetadata?.archiveTimestamp ? Date.parse(channel.threadMetadata.archiveTimestamp) : undefined
    ),
    autoArchiveDuration: createNewProp(channel.threadMetadata?.autoArchiveDuration || 0),
    bitfield: createNewProp(bitfield),
    ownerId: createNewProp(snowflakeToBigint(channel.ownerId!)),
    botIsMember: createNewProp(Boolean(channel.member)),
    members: createNewProp(new Collection<bigint, Omit<ThreadMemberModified, "id">>()),
  }) as DiscordenoThread;
}

export interface Thread {
  id: string;
  name: string;
  type:
    | DiscordChannelTypes.GuildNewsThread
    | DiscordChannelTypes.GuildPublicThread
    | DiscordChannelTypes.GuildPrivateThread;
  parentId: string;
  memberCount: number;
  messageCount: number;
  archiveTimestamp: string;
  autoArchiveDuration: number;
  archived: boolean;
  locked: boolean;
  ownerId: string;
  botIsMember: boolean;
}

export interface DiscordenoThread {
  name: string;
  id: bigint;
  type:
    | DiscordChannelTypes.GuildNewsThread
    | DiscordChannelTypes.GuildPublicThread
    | DiscordChannelTypes.GuildPrivateThread;
  parentId: bigint;
  memberCount: number;
  messageCount: number;
  archiveTimestamp: number;
  autoArchiveDuration: number;
  archived: boolean;
  locked: boolean;
  bitfield: bigint;
  ownerId: bigint;
  isPrivate: boolean;
  isPublic: boolean;
  botIsMember: boolean;
  guildId: bigint;
  members: Collection<bigint, Omit<ThreadMemberModified, "id">>;
  toJSON(): Thread;
}
