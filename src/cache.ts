// deno-lint-ignore-file require-await no-explicit-any prefer-const
import { botId } from "./bot.ts";
import type { DiscordenoChannel } from "./structures/channel.ts";
import type { DiscordenoGuild } from "./structures/guild.ts";
import type { DiscordenoMember } from "./structures/member.ts";
import type { DiscordenoMessage } from "./structures/message.ts";
import type { PresenceUpdate } from "./types/activity/presence_update.ts";
import type { Emoji } from "./types/emojis/emoji.ts";
import { Thread } from "./util/channel_to_thread.ts";
import { Collection } from "./util/collection.ts";

export const cache = {
  isReady: false,
  /** All of the guild objects the bot has access to, mapped by their Ids */
  guilds: new Collection<bigint, DiscordenoGuild>([], { sweeper: { filter: guildSweeper, interval: 3600000 } }),
  /** All of the channel objects the bot has access to, mapped by their Ids. Sweep channels 1 minute after guilds are sweeped so dispatchedGuildIds is filled. */
  channels: new Collection<bigint, DiscordenoChannel>([], { sweeper: { filter: channelSweeper, interval: 3660000 } }),
  /** All of the message objects the bot has cached since the bot acquired `READY` state, mapped by their Ids */
  messages: new Collection<bigint, DiscordenoMessage>([], { sweeper: { filter: messageSweeper, interval: 300000 } }),
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: new Collection<bigint, DiscordenoMember>([], { sweeper: { filter: memberSweeper, interval: 300000 } }),
  /** All of the unavailable guilds, mapped by their Ids (id, timestamp) */
  unavailableGuilds: new Collection<bigint, number>(),
  /** All of the presence update objects received in PRESENCE_UPDATE gateway event, mapped by their user Id */
  presences: new Collection<bigint, PresenceUpdate>([], { sweeper: { filter: () => true, interval: 300000 } }),
  fetchAllMembersProcessingRequests: new Collection<
    string,
    (value: Collection<bigint, DiscordenoMember> | PromiseLike<Collection<bigint, DiscordenoMember>>) => void
  >(),
  executedSlashCommands: new Set<string>(),
  get emojis() {
    return new Collection<bigint, Emoji>(
      this.guilds.reduce((a, b) => [...a, ...b.emojis.map((e) => [e.id, e])], [] as any[])
    );
  },
  activeGuildIds: new Set<bigint>(),
  dispatchedGuildIds: new Set<bigint>(),
  dispatchedChannelIds: new Set<bigint>(),
  threads: new Collection<bigint, Thread>(),
};

function messageSweeper(message: DiscordenoMessage) {
  // DM messages aren't needed
  if (!message.guildId) return true;

  // Only delete messages older than 10 minutes
  return Date.now() - message.timestamp > 600000;
}

function memberSweeper(member: DiscordenoMember) {
  // Don't sweep the bot else strange things will happen
  if (member.id === botId) return false;

  // Only sweep members who were not active the last 30 minutes
  return Date.now() - member.cachedAt > 1800000;
}

function guildSweeper(guild: DiscordenoGuild) {
  // Reset activity for next interval
  if (cache.activeGuildIds.delete(guild.id)) return false;

  // This is inactive guild. Not a single thing has happened for atleast 30 minutes.
  // Not a reaction, not a message, not any event!
  cache.dispatchedGuildIds.add(guild.id);

  return true;
}

function channelSweeper(channel: DiscordenoChannel, key: bigint) {
  // If this is in a guild and the guild was dispatched, then we can dispatch the channel
  if (channel.guildId && cache.dispatchedGuildIds.has(channel.guildId)) {
    cache.dispatchedChannelIds.add(channel.id);
    return true;
  }

  // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we dont need to cache their dm channel.
  if (!channel.guildId && !cache.members.has(key)) return true;

  return false;
}

export let cacheHandlers = {
  /** Deletes all items from the cache */
  async clear(table: TableName) {
    return cache[table].clear();
  },
  /** Deletes 1 item from cache using the key */
  async delete(table: TableName, key: bigint) {
    return cache[table].delete(key);
  },
  /** Check if something exists in cache with a key */
  async has(table: TableName, key: bigint) {
    return cache[table].has(key);
  },

  /** Get the number of key-value pairs */
  async size(table: TableName) {
    return cache[table].size;
  },

  // Done differently to have overloads
  /** Add a key value pair to the cache */
  set,
  /** Get the value from the cache using its key */
  get,
  /** Run a function on all items in this cache */
  forEach,
  /** Allows you to filter our all items in this cache. */
  filter,
};

export type TableName = "guilds" | "unavailableGuilds" | "channels" | "messages" | "members" | "presences" | "threads";

async function set(table: "threads", key: bigint, value: Thread): Promise<Collection<bigint, Thread>>;
async function set(table: "guilds", key: bigint, value: DiscordenoGuild): Promise<Collection<bigint, DiscordenoGuild>>;
async function set(
  table: "channels",
  key: bigint,
  value: DiscordenoChannel
): Promise<Collection<bigint, DiscordenoChannel>>;
async function set(
  table: "messages",
  key: bigint,
  value: DiscordenoMessage
): Promise<Collection<bigint, DiscordenoMessage>>;
async function set(
  table: "members",
  key: bigint,
  value: DiscordenoMember
): Promise<Collection<bigint, DiscordenoMember>>;
async function set(table: "presences", key: bigint, value: PresenceUpdate): Promise<Collection<bigint, PresenceUpdate>>;
async function set(table: "unavailableGuilds", key: bigint, value: number): Promise<Collection<bigint, number>>;
async function set(table: TableName, key: bigint, value: any) {
  return cache[table].set(key, value);
}

async function get(table: "threads", key: bigint): Promise<Thread | undefined>;
async function get(table: "guilds", key: bigint): Promise<DiscordenoGuild | undefined>;
async function get(table: "channels", key: bigint): Promise<DiscordenoChannel | undefined>;
async function get(table: "messages", key: bigint): Promise<DiscordenoMessage | undefined>;
async function get(table: "members", key: bigint): Promise<DiscordenoMember | undefined>;
async function get(table: "presences", key: bigint): Promise<PresenceUpdate | undefined>;
async function get(table: "unavailableGuilds", key: bigint): Promise<number | undefined>;
async function get(table: TableName, key: bigint) {
  return cache[table].get(key);
}

function forEach(table: "threads", callback: (value: Thread, key: bigint, map: Map<bigint, Thread>) => unknown): void;
function forEach(
  table: "guilds",
  callback: (value: DiscordenoGuild, key: bigint, map: Map<bigint, DiscordenoGuild>) => unknown
): void;
function forEach(
  table: "unavailableGuilds",
  callback: (value: number, key: bigint, map: Map<bigint, number>) => unknown
): void;
function forEach(
  table: "channels",
  callback: (value: DiscordenoChannel, key: bigint, map: Map<bigint, DiscordenoChannel>) => unknown
): void;
function forEach(
  table: "messages",
  callback: (value: DiscordenoMessage, key: bigint, map: Map<bigint, DiscordenoMessage>) => unknown
): void;
function forEach(
  table: "members",
  callback: (value: DiscordenoMember, key: bigint, map: Map<bigint, DiscordenoMember>) => unknown
): void;
function forEach(table: TableName, callback: (value: any, key: bigint, map: Map<bigint, any>) => unknown) {
  return cache[table].forEach(callback);
}

async function filter(
  table: "threads",
  callback: (value: Thread, key: bigint) => boolean
): Promise<Collection<bigint, Thread>>;
async function filter(
  table: "guilds",
  callback: (value: DiscordenoGuild, key: bigint) => boolean
): Promise<Collection<bigint, DiscordenoGuild>>;
async function filter(
  table: "unavailableGuilds",
  callback: (value: number, key: bigint) => boolean
): Promise<Collection<bigint, number>>;
async function filter(
  table: "channels",
  callback: (value: DiscordenoChannel, key: bigint) => boolean
): Promise<Collection<bigint, DiscordenoChannel>>;
async function filter(
  table: "messages",
  callback: (value: DiscordenoMessage, key: bigint) => boolean
): Promise<Collection<bigint, DiscordenoMessage>>;
async function filter(
  table: "members",
  callback: (value: DiscordenoMember, key: bigint) => boolean
): Promise<Collection<bigint, DiscordenoMember>>;
async function filter(table: TableName, callback: (value: any, key: bigint) => boolean) {
  return cache[table].filter(callback);
}
