// deno-lint-ignore-file require-await no-explicit-any prefer-const

import { Channel, Guild, Member, Message } from "./structures/mod.ts";
import { Collection } from "./util/collection.ts";

export const cache: CacheData = {
  isReady: false,
  /** All of the guild objects the bot has access to, mapped by their IDs */
  guilds: new Collection(),
  /** All of the channel objects the bot has access to, mapped by their IDs */
  channels: new Collection(),
  /** All of the message objects the bot has cached since the bot acquired `READY` state, mapped by their IDs */
  messages: new Collection(),
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their IDs */
  members: new Collection(),
  /** All of the unavailable guilds, mapped by their IDs (id, shardID) */
  unavailableGuilds: new Collection(),
  /** All of the presence update objects received in PRESENCE_UPDATE gateway event, mapped by their user ID */
  presences: new Collection(),
  fetchAllMembersProcessingRequests: new Collection(),
  executedSlashCommands: new Collection(),
};

export let cacheHandlers = {
  /** Deletes all items from the cache */
  async clear(table: TableName) {
    return cache[table].clear();
  },
  /** Deletes 1 item from cache using the key */
  async delete(table: TableName, key: string) {
    return cache[table].delete(key);
  },
  /** Check if something exists in cache with a key */
  async has(table: TableName, key: string) {
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

export type TableName =
  | "guilds"
  | "unavailableGuilds"
  | "channels"
  | "messages"
  | "members"
  | "presences";

function set(
  table: "guilds",
  key: string,
  value: Guild,
): Promise<Collection<string, Guild>>;
function set(
  table: "channels",
  key: string,
  value: Channel,
): Promise<Collection<string, Channel>>;
function set(
  table: "messages",
  key: string,
  value: Message,
): Promise<Collection<string, Message>>;
function set(
  table: "members",
  key: string,
  value: Member,
): Promise<Collection<string, Member>>;
function set(
  table: "presences",
  key: string,
  value: PresenceUpdatePayload,
): Promise<Collection<string, PresenceUpdatePayload>>;
function set(
  table: "unavailableGuilds",
  key: string,
  value: number,
): Promise<Collection<string, number>>;
async function set(table: TableName, key: string, value: any) {
  return cache[table].set(key, value);
}

function get(table: "guilds", key: string): Promise<Guild | undefined>;
function get(table: "channels", key: string): Promise<Channel | undefined>;
function get(table: "messages", key: string): Promise<Message | undefined>;
function get(table: "members", key: string): Promise<Member | undefined>;
function get(
  table: "presences",
  key: string,
): Promise<PresenceUpdatePayload | undefined>;
function get(
  table: "unavailableGuilds",
  key: string,
): Promise<Guild | undefined>;
async function get(table: TableName, key: string) {
  return cache[table].get(key);
}

function forEach(
  table: "guilds",
  callback: (value: Guild, key: string, map: Map<string, Guild>) => unknown,
): void;
function forEach(
  table: "unavailableGuilds",
  callback: (value: Guild, key: string, map: Map<string, Guild>) => unknown,
): void;
function forEach(
  table: "channels",
  callback: (value: Channel, key: string, map: Map<string, Channel>) => unknown,
): void;
function forEach(
  table: "messages",
  callback: (value: Message, key: string, map: Map<string, Message>) => unknown,
): void;
function forEach(
  table: "members",
  callback: (value: Member, key: string, map: Map<string, Member>) => unknown,
): void;
function forEach(
  table: TableName,
  callback: (value: any, key: string, map: Map<string, any>) => unknown,
) {
  return cache[table].forEach(callback);
}

function filter(
  table: "guilds",
  callback: (value: Guild, key: string) => boolean,
): Promise<Collection<string, Guild>>;
function filter(
  table: "unavailableGuilds",
  callback: (value: Guild, key: string) => boolean,
): Promise<Collection<string, Guild>>;
function filter(
  table: "channels",
  callback: (value: Channel, key: string) => boolean,
): Promise<Collection<string, Channel>>;
function filter(
  table: "messages",
  callback: (value: Message, key: string) => boolean,
): Promise<Collection<string, Message>>;
function filter(
  table: "members",
  callback: (value: Member, key: string) => boolean,
): Promise<Collection<string, Member>>;
async function filter(
  table: TableName,
  callback: (value: any, key: string) => boolean,
) {
  return cache[table].filter(callback);
}
