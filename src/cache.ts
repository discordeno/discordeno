// deno-lint-ignore-file require-await no-explicit-any prefer-const
import { DiscordenoChannel } from "./structures/channel.ts";
import { DiscordenoGuild } from "./structures/guild.ts";
import { DiscordenoMember } from "./structures/member.ts";
import { DiscordenoMessage } from "./structures/message.ts";
import { Emoji } from "./types/emojis/emoji.ts";
import { PresenceUpdate } from "./types/misc/presence_update.ts";
import { Collection } from "./util/collection.ts";

export const cache = {
  isReady: false,
  /** All of the guild objects the bot has access to, mapped by their Ids */
  guilds: new Collection<string, DiscordenoGuild>(),
  /** All of the channel objects the bot has access to, mapped by their Ids */
  channels: new Collection<string, DiscordenoChannel>(),
  /** All of the message objects the bot has cached since the bot acquired `READY` state, mapped by their Ids */
  messages: new Collection<string, DiscordenoMessage>(),
  /** All of the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: new Collection<string, DiscordenoMember>(),
  /** All of the unavailable guilds, mapped by their Ids (id, timestamp) */
  unavailableGuilds: new Collection<string, number>(),
  /** All of the presence update objects received in PRESENCE_UPDATE gateway event, mapped by their user Id */
  presences: new Collection<string, PresenceUpdate>(),
  fetchAllMembersProcessingRequests: new Collection<
    string,
    (
      value:
        | Collection<string, DiscordenoMember>
        | PromiseLike<Collection<string, DiscordenoMember>>,
    ) => void
  >(),
  executedSlashCommands: new Collection<string, string>(),
  get emojis() {
    return new Collection<string, Emoji>(
      this.guilds.reduce(
        (a, b) => [...a, ...b.emojis.map((e) => [e.id, e])],
        [] as any[],
      ),
    );
  },
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
  value: DiscordenoGuild,
): Promise<Collection<string, DiscordenoGuild>>;
function set(
  table: "channels",
  key: string,
  value: DiscordenoChannel,
): Promise<Collection<string, DiscordenoChannel>>;
function set(
  table: "messages",
  key: string,
  value: DiscordenoMessage,
): Promise<Collection<string, DiscordenoMessage>>;
function set(
  table: "members",
  key: string,
  value: DiscordenoMember,
): Promise<Collection<string, DiscordenoMember>>;
function set(
  table: "presences",
  key: string,
  value: PresenceUpdate,
): Promise<Collection<string, PresenceUpdate>>;
function set(
  table: "unavailableGuilds",
  key: string,
  value: number,
): Promise<Collection<string, number>>;
async function set(table: TableName, key: string, value: any) {
  return cache[table].set(key, value);
}

function get(
  table: "guilds",
  key: string,
): Promise<DiscordenoGuild | undefined>;
function get(
  table: "channels",
  key: string,
): Promise<DiscordenoChannel | undefined>;
function get(
  table: "messages",
  key: string,
): Promise<DiscordenoMessage | undefined>;
function get(
  table: "members",
  key: string,
): Promise<DiscordenoMember | undefined>;
function get(
  table: "presences",
  key: string,
): Promise<PresenceUpdate | undefined>;
function get(
  table: "unavailableGuilds",
  key: string,
): Promise<number | undefined>;
async function get(table: TableName, key: string) {
  return cache[table].get(key);
}

function forEach(
  table: "guilds",
  callback: (
    value: DiscordenoGuild,
    key: string,
    map: Map<string, DiscordenoGuild>,
  ) => unknown,
): void;
function forEach(
  table: "unavailableGuilds",
  callback: (value: number, key: string, map: Map<string, number>) => unknown,
): void;
function forEach(
  table: "channels",
  callback: (
    value: DiscordenoChannel,
    key: string,
    map: Map<string, DiscordenoChannel>,
  ) => unknown,
): void;
function forEach(
  table: "messages",
  callback: (
    value: DiscordenoMessage,
    key: string,
    map: Map<string, DiscordenoMessage>,
  ) => unknown,
): void;
function forEach(
  table: "members",
  callback: (
    value: DiscordenoMember,
    key: string,
    map: Map<string, DiscordenoMember>,
  ) => unknown,
): void;
function forEach(
  table: TableName,
  callback: (value: any, key: string, map: Map<string, any>) => unknown,
) {
  return cache[table].forEach(callback);
}

function filter(
  table: "guilds",
  callback: (value: DiscordenoGuild, key: string) => boolean,
): Promise<Collection<string, DiscordenoGuild>>;
function filter(
  table: "unavailableGuilds",
  callback: (value: number, key: string) => boolean,
): Promise<Collection<string, number>>;
function filter(
  table: "channels",
  callback: (value: DiscordenoChannel, key: string) => boolean,
): Promise<Collection<string, DiscordenoChannel>>;
function filter(
  table: "messages",
  callback: (value: DiscordenoMessage, key: string) => boolean,
): Promise<Collection<string, DiscordenoMessage>>;
function filter(
  table: "members",
  callback: (value: DiscordenoMember, key: string) => boolean,
): Promise<Collection<string, DiscordenoMember>>;
async function filter(
  table: TableName,
  callback: (value: any, key: string) => boolean,
) {
  return cache[table].filter(callback);
}
