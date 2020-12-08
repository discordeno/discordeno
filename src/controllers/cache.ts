import { Channel, Guild, Member, Message } from "../structures/structures.ts";
import { PresenceUpdatePayload } from "../types/types.ts";
import { cache } from "../utils/cache.ts";
import { Collection } from "../utils/collection.ts";

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

export let cacheHandlers = {
  /** Deletes all items from the cache */
  clear: async function (table: TableName) {
    return cache[table].clear();
  },
  /** Deletes 1 item from cache using the key */
  delete: async function (table: TableName, key: string) {
    return cache[table].delete(key);
  },
  /** Check if something exists in cache with a key */
  has: async function (table: TableName, key: string) {
    return cache[table].has(key);
  },

  /** Get the number of key-value pairs */
  size: async (table: TableName) => {
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
