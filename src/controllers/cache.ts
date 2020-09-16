import { Channel } from "../structures/channel.ts";
import { Guild } from "../structures/guild.ts";
import { Message } from "../structures/message.ts";
import { PresenceUpdatePayload } from "../types/discord.ts";
import { cache } from "../utils/cache.ts";
import { Collection } from "../utils/collection.ts";

export type TableName =
  | "guilds"
  | "channels"
  | "messages"
  | "presences"
  | "unavailableGuilds"
  | "fetchAllMembersProcessingRequests";

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
  table: "presences",
  key: string,
  value: PresenceUpdatePayload,
): Promise<Collection<string, PresenceUpdatePayload>>;
function set(
  table: "unavailableGuilds",
  key: string,
  value: number,
): Promise<Collection<string, number>>;
function set(
  table: "fetchAllMembersProcessingRequests",
  key: string,
  value: number,
): Promise<Collection<string, number>>;
async function set(table: TableName, key: string, value: any) {
  return cache[table].set(key, value);
}

function get(table: "guilds", key: string): Promise<Guild>;
function get(table: "channels", key: string): Promise<Channel>;
function get(table: "messages", key: string): Promise<Message>;
function get(table: "presences", key: string): Promise<PresenceUpdatePayload>;
function get(table: "unavailableGuilds", key: string): Promise<Guild>;
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
  table: TableName,
  callback: (value: any, key: string, map: Map<string, any>) => unknown,
) {
  return cache[table].forEach(callback);
}

export let cacheHandlers = {
  delete: async function (table: TableName, key: string) {
    return cache[table].delete(key);
  },
  has: async function (table: TableName, key: string) {
    return cache[table].has(key);
  },
  // Done differently to have overloads
  set,
  get,
  forEach,
};

export type CacheHandlers = typeof cacheHandlers;

export function updateCacheHandlers(newCacheHandlers: CacheHandlers) {
  cacheHandlers = {
    ...cacheHandlers,
    ...newCacheHandlers,
  };
}
