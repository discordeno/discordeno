import { Bot } from "./bot.ts";
import type { DiscordenoChannel } from "./transformers/channel.ts";
import type { DiscordenoGuild } from "./transformers/guild.ts";
import type { DiscordenoMember, DiscordenoUser } from "./transformers/member.ts";
import type { DiscordenoMessage } from "./transformers/message.ts";
import { DiscordenoPresence } from "./transformers/presence.ts";
import { PresenceUpdate } from "./types/activity/presence_update.ts";
import { Channel } from "./types/channels/channel.ts";
import { GuildMember } from "./types/members/guild_member.ts";
import { Message } from "./types/messages/message.ts";
import { SnakeCasedPropertiesDeep } from "./types/util.ts";
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

    return {
      guilds: tableCreator("guilds"),
      users: tableCreator("users"),
      channels: tableCreator("channels"),
      messages: tableCreator("messages"),
      presences: tableCreator("presences"),
      // threads: tableCreator("threads"),
      unavailableGuilds: tableCreator("unavailableGuilds"),
      executedSlashCommands: new Set(),
    } as AsyncCache;
  }
  if (!tableCreator) tableCreator = createTable;

  return {
    guilds: tableCreator("guilds"),
    users: tableCreator("users"),
    channels: tableCreator("channels"),
    messages: tableCreator("messages"),
    presences: tableCreator("presences"),
    // threads: tableCreator("threads"),
    unavailableGuilds: tableCreator("unavailableGuilds"),
    executedSlashCommands: new Set(),
  } as Cache;
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
  const table = new Collection<BigInt, T>();
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
  delete(key: BigInt): boolean;
  /** Check if there is data assigned to this key. */
  has(key: BigInt): boolean;
  /** Check how many items are stored in this table. */
  size(): number;
  /** Store new data to this table. */
  set(key: BigInt, data: T): boolean;
  /** Get a stored item from the table. */
  get(key: BigInt): T | undefined;
  // TODO: maybe its possible to stringify the function and send it to the custom cache handler :thinking:
  /**
   * Loop over each entry and execute callback function.
   * @important This function NOT optimised and will force load everything when using custom cache.
   */
  forEach(callback: (value: T, key: BigInt) => unknown): void;
  // TODO: maybe its possible to stringify the function and send it to the custom cache handler :thinking:
  /**
   * Loop over each entry and execute callback function.
   * @important This function NOT optimised and will force load everything when using custom cache.
   */
  filter(callback: (value: T, key: BigInt) => boolean): Collection<BigInt, T>;
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
) => Promise<undefined>;

export function createExecute(cache: Cache | AsyncCache): CacheExecutor {
  // @ts-ignore no time to look into these errors now
  return async (type, options) => {
    if (type === "DELETE_MESSAGES_FROM_CHANNEL") {
      await cache.messages.forEach(async (message) => {
        // @ts-ignore me smarter than u
        if (BigInt(message.channelId) === options.channelId) {
          await cache.messages.delete(BigInt(message.id));
        }
      });

      return undefined;
    }

    // switch type {
    //   case ""
    // }
  };
}

export type TableNames = "channels" | "users" | "guilds" | "messages" | "presences" | "threads" | "unavailableGuilds";

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
