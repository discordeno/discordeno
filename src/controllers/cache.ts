import { Channel } from "../structures/channel.ts";
import { Guild } from "../structures/guild.ts";
import { Message } from "../structures/message.ts";
import { cache } from "../utils/cache.ts";
import { Collection } from "../utils/collection.ts";

export type TableName = "guilds" | "channels" | "messages";

export function test(
  test: "guilds",
  key: string,
  value: Guild,
): Promise<Collection<string, Guild>>;
export function test(
  test: "channels",
  key: string,
  value: Channel,
): Promise<Collection<string, Channel>>;
export function test(
  test: "messages",
  key: string,
  value: Message,
): Promise<Collection<string, Message>>;
export async function test(table: TableName, key: string, value: unknown) {
  return cache[table].set(key, value);
}

export let cacheHandlers = {
  get: async function (table: TableName, key: string) {
    return cache[table].get(key);
  },
  delete: async function (table: TableName, key: string) {
    return cache[table].delete(key);
  },
  set: async function (
    table: TableName,
    key: string,
    value: Channel | Guild | Message,
  ) {
    return cache[table].set(key, value);
  },
};

export type CacheHandlers = typeof cacheHandlers;

export function updateCacheHandlers(newCacheHandlers: CacheHandlers) {
  cacheHandlers = {
    ...cacheHandlers,
    ...newCacheHandlers,
  };
}
