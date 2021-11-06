import type { DiscordenoChannel } from "./transformers/channel.ts";
import type { DiscordenoGuild } from "./transformers/guild.ts";
import type { DiscordenoMember, DiscordenoUser } from "./transformers/member.ts";
import type { DiscordenoMessage } from "./transformers/message.ts";
import { DiscordenoPresence } from "./transformers/presence.ts";
import { GuildMember } from "./types/members/guild_member.ts";
import { Collection } from "./util/collection.ts";

export function createCache(
  isAsync: true,
  // deno-lint-ignore no-explicit-any
  tableCreator: (tableName: TableNames) => AsyncCacheHandler<any>
): AsyncCache;
export function createCache(
  isAsync: false,
  // deno-lint-ignore no-explicit-any
  tableCreator?: (tableName: TableNames) => CacheHandler<any>
): Cache;
export function createCache(
  isAsync: boolean,
  tableCreator?: (
    tableName: TableNames
    // deno-lint-ignore no-explicit-any
  ) => CacheHandler<any> | AsyncCacheHandler<any>
): Omit<Cache, "execute"> | Omit<AsyncCache, "execute"> {
  if (isAsync) {
    if (!tableCreator) {
      throw new Error("Async cache requires a tableCreator to be passed.");
    }

    const cache = {
      guilds: tableCreator("guilds"),
      users: tableCreator("users"),
      members: tableCreator("members"),
      channels: tableCreator("channels"),
      messages: tableCreator("messages"),
      presences: tableCreator("presences"),
      // threads: tableCreator("threads"),
      unavailableGuilds: tableCreator("unavailableGuilds"),
      executedSlashCommands: new Set(),
      fetchAllMembersProcessingRequests: new Map(),
    } as AsyncCache;

    cache.execute = async function () {
      throw new Error("Async Cache requires a custom execute function to be implemented.");
    };

    return cache;
  }
  if (!tableCreator) tableCreator = createTable;

  const cache = {
    guilds: tableCreator("guilds"),
    users: tableCreator("users"),
    members: tableCreator("members"),
    channels: tableCreator("channels"),
    messages: tableCreator("messages"),
    presences: tableCreator("presences"),
    // threads: tableCreator("threads"),
    unavailableGuilds: tableCreator("unavailableGuilds"),
    executedSlashCommands: new Set(),
    fetchAllMembersProcessingRequests: new Map(),
  } as Cache;

  cache.execute = createExecute(cache);

  return cache;
}

export type CachedDiscordenoUser = DiscordenoUser & { guilds: Map<bigint, GuildMember> };

export interface Cache {
  guilds: CacheHandler<DiscordenoGuild>;
  users: CacheHandler<DiscordenoUser>;
  members: CacheHandler<DiscordenoMember>;
  channels: CacheHandler<DiscordenoChannel>;
  messages: CacheHandler<DiscordenoMessage>;
  presences: CacheHandler<DiscordenoPresence>;
  // threads: CacheHandler<DiscordenoThread>;
  unavailableGuilds: CacheHandler<CachedUnavailableGuild>;
  dispatchedGuildIds: CacheHandler<bigint>;
  dispatchedChannelIds: CacheHandler<bigint>;
  executedSlashCommands: Set<string>;
  fetchAllMembersProcessingRequests: Map<string, Function>;
  execute: CacheExecutor;
}

export interface CachedUnavailableGuild {
  shardId: number;
  since: number;
  dispatched?: true;
}

export interface AsyncCache {
  guilds: AsyncCacheHandler<DiscordenoGuild>;
  users: AsyncCacheHandler<DiscordenoUser>;
  members: CacheHandler<DiscordenoMember>;
  channels: AsyncCacheHandler<DiscordenoChannel>;
  messages: AsyncCacheHandler<DiscordenoMessage>;
  presences: AsyncCacheHandler<DiscordenoPresence>;
  // threads: AsyncCacheHandler<DiscordenoThread>;
  unavailableGuilds: AsyncCacheHandler<CachedUnavailableGuild>;
  dispatchedGuildIds: AsyncCacheHandler<bigint>;
  dispatchedChannelIds: AsyncCacheHandler<bigint>;
  executedSlashCommands: Set<string>;
  fetchAllMembersProcessingRequests: Map<string, Function>;
  execute: CacheExecutor;
}

function createTable<T>(_table: TableNames): CacheHandler<T> {
  const table = new Collection<bigint, T>();
  return {
    clear: () => table.clear(),
    delete: (key) => table.delete(key),
    has: (key) => table.has(key),
    size: () => table.size,
    set: (key, data) => !!table.set(key, data),
    get: (key) => table.get(key),
    forEach: (callback) => table.forEach(callback),
    filter: (callback) => table.filter(callback),
  };
}

export interface CacheHandler<T> {
  /** Completely empty this table. */
  clear(): void;
  /** Delete the data related to this key from table. */
  delete(key: bigint): boolean;
  /** Check if there is data assigned to this key. */
  has(key: bigint): boolean;
  /** Check how many items are stored in this table. */
  size(): number;
  /** Store new data to this table. */
  set(key: bigint, data: T): boolean;
  /** Get a stored item from the table. */
  get(key: bigint): T | undefined;
  // TODO: maybe its possible to stringify the function and send it to the custom cache handler :thinking:
  /**
   * Loop over each entry and execute callback function.
   * @important This function NOT optimised and will force load everything when using custom cache.
   */
  forEach(callback: (value: T, key: bigint) => unknown): void;
  // TODO: maybe its possible to stringify the function and send it to the custom cache handler :thinking:
  /**
   * Loop over each entry and execute callback function.
   * @important This function NOT optimised and will force load everything when using custom cache.
   */
  filter(callback: (value: T, key: bigint) => boolean): Collection<bigint, T>;
}

export type AsyncCacheHandler<T> = {
  [K in keyof CacheHandler<T>]: (...args: Parameters<CacheHandler<T>[K]>) => Promise<ReturnType<CacheHandler<T>[K]>>;
};

export type CacheExecutor = (
  type:
    | "FILTER_CATEGORY_CHILDREN_CHANNELS"
    | "DELETE_MESSAGES_FROM_CHANNEL"
    | "DELETE_ROLE_FROM_MEMBER"
    | "BULK_DELETE_MESSAGES"
    | "GUILD_MEMBER_CHUNK"
    | "GUILD_MEMBER_COUNT_DECREMENT"
    | "GUILD_MEMBER_COUNT_INCREMENT"
    | "DELETE_MESSAGES_FROM_GUILD"
    | "DELETE_CHANNELS_FROM_GUILD"
    | "DELETE_GUILD_FROM_MEMBER",
  options: Record<string, any>
) => Promise<any>;

export function createExecute(cache: Cache): CacheExecutor {
  return function (type, options) {
    switch (type) {
      case "FILTER_CATEGORY_CHILDREN_CHANNELS":
        return cache.channels.filter((c) => c.parentId === options.parentChannelId);
      case "DELETE_MESSAGES_FROM_CHANNEL":
        cache.messages.forEach((message) => {
          if (message.channelId === options.channelId) {
            cache.messages.delete(message.id);
          }
        });
        return;
      case "BULK_DELETE_MESSAGES":
        return options.messageIds
          .map((id: bigint) => {
            const cached = cache.messages.get(id);
            if (!cached) return;

            cache.messages.delete(id);

            return cached;
          })
          .filter((m: DiscordenoMessage) => m);
      case "GUILD_MEMBER_CHUNK":
        options.users.forEach((user: DiscordenoUser) => {
          cache.users.set(user.id, user);
        });
        // TODO: FIND A GOOD WAY FOR MEMBERS CACHE (GUILD ID)
        // options.members.forEach((member) => {
        //   cache.members.set(member.id, member);
        // });
        return;
    }
  };
}

export type TableNames =
  | "channels"
  | "users"
  | "guilds"
  | "messages"
  | "presences"
  | "threads"
  | "unavailableGuilds"
  | "members";

// function messageSweeper(bot: Bot, message: DiscordenoMessage) {
//   // DM messages aren't needed
//   if (!message.guildId) return true;

//   // Only delete messages older than 10 minutes
//   return Date.now() - message.timestamp > 600000;
// }

// function memberSweeper(bot: Bot, member: DiscordenoMember) {
//   // Don't sweep the bot else strange things will happen
//   if (member.id === bot.id) return false;

//   // Only sweep members who were not active the last 30 minutes
//   return Date.now() - member.cachedAt > 1800000;
// }

// async function guildSweeper(bot: Bot, guild: DiscordenoGuild) {
//   // Reset activity for next interval
//   if (await bot.cache.activeGuildIds.delete(guild.id)) return false;

//   // This is inactive guild. Not a single thing has happened for atleast 30 minutes.
//   // Not a reaction, not a message, not any event!
//   await bot.cache.dispatchedGuildIds.set(guild.id);

//   return true;
// }

// async function channelSweeper(bot: Bot, channel: DiscordenoChannel, key: bigint) {
//   // If this is in a guild and the guild was dispatched, then we can dispatch the channel
//   if (channel.guildId && (await bot.cache.dispatchedGuildIds.has(channel.guildId))) {
//     await bot.cache.dispatchedChannelIds.set(channel.id);
//     return true;
//   }

//   // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we dont need to cache their dm channel.
//   if (!channel.guildId && !(await bot.cache.members.has(key))) return true;

//   return false;
// }
