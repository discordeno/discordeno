// deno-lint-ignore-file require-await no-explicit-any prefer-const
import { botId } from "./bot.ts";
import type { DiscordenoChannel } from "./structures/channel.ts";
import type { DiscordenoGuild } from "./structures/guild.ts";
import type { DiscordenoMember } from "./structures/member.ts";
import type { DiscordenoMessage } from "./structures/message.ts";
import type { PresenceUpdate } from "./types/activity/presence_update.ts";
import type { Emoji } from "./types/emojis/emoji.ts";
import { DiscordenoThread } from "./util/transformers/channel_to_thread.ts";
import { Collection } from "./util/collection.ts";
import { Channel } from "./types/channels/channel.ts";
import { Guild } from "./types/guilds/guild.ts";
import { GuildMember } from "./types/members/guild_member.ts";
import { Message } from "./types/messages/message.ts";
import { Role } from "./types/permissions/role.ts";
import { VoiceState } from "./types/voice/voice_state.ts";
import { User } from "./types/users/user.ts";

export const cache = {
  isReady: false,
  /** All the guild objects the bot has access to, mapped by their Ids */
  guilds: new Collection<bigint, DiscordenoGuild>([], { sweeper: { filter: guildSweeper, interval: 3600000 } }),
  /** All the channel objects the bot has access to, mapped by their Ids. Sweep channels 1 minute after guilds are sweeped so dispatchedGuildIds is filled. */
  channels: new Collection<bigint, DiscordenoChannel>([], { sweeper: { filter: channelSweeper, interval: 3660000 } }),
  /** All the message objects the bot has cached since the bot acquired `READY` state, mapped by their Ids */
  messages: new Collection<bigint, DiscordenoMessage>([], { sweeper: { filter: messageSweeper, interval: 300000 } }),
  /** All the member objects that have been cached since the bot acquired `READY` state, mapped by their Ids */
  members: new Collection<bigint, DiscordenoMember>([], { sweeper: { filter: memberSweeper, interval: 300000 } }),
  /** All the unavailable guilds, mapped by their Ids (id, timestamp) */
  unavailableGuilds: new Collection<bigint, number>(),
  /** All the presence update objects received in PRESENCE_UPDATE gateway event, mapped by their user Id */
  presences: new Collection<bigint, PresenceUpdate>([], { sweeper: { filter: () => true, interval: 300000 } }),
  fetchAllMembersProcessingRequests: new Collection<
    string,
    (value: Collection<bigint, DiscordenoMember> | PromiseLike<Collection<bigint, DiscordenoMember>>) => void
  >(),
  executedSlashCommands: new Set<string>(),
  get emojis() {
    return new Collection<bigint, Emoji>(
      this.guilds.reduce((a, b) => [...a, ...b.emojis.map((e, id) => [id, e])], [] as any[])
    );
  },
  activeGuildIds: new Set<bigint>(),
  dispatchedGuildIds: new Set<bigint>(),
  dispatchedChannelIds: new Set<bigint>(),
  threads: new Collection<bigint, DiscordenoThread>(),
  /** ADVANCED USER ONLY: Please ask for help before modifying these. The properties that you want to use for your bot's structures. If you do not set any properties, all properties will be used by default. */
  requiredStructureProperties: {
    /** Only these properties will be added to memory for your channels. */
    channels: new Set<keyof Channel>(),
    /** Only these properties will be added to memory for your guilds. */
    guilds: new Set<keyof Guild | "shardId" | "bitfield">(),
    /** Only these properties will be added to memory for your members. */
    members: new Set<keyof GuildMember | keyof User | "guilds" | "bitfield" | "cachedAt">(),
    /** Only these properties will be added to memory for your messages. */
    messages: new Set<
      | keyof Message
      | "isBot"
      | "tag"
      | "authorId"
      | "mentionedUserIds"
      | "mentionedRoleIds"
      | "mentionedChannelIds"
      | "bitfield"
    >(),
    /** Only these properties will be added to memory for your roles. */
    roles: new Set<keyof Role | "botId" | "isNitroBoostRole" | "integrationId" | "bitfield">(),
    /** Only these properties will be added to memory for your voice states. */
    voiceStates: new Set<keyof VoiceState | "bitfield">(),
  },
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

  // This is inactive guild. Not a single thing has happened for at least 30 minutes.
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

  // THE KEY DM CHANNELS ARE STORED BY IS THE USER ID. If the user is not cached, we don't need to cache their dm channel.
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

async function set(
  table: "threads",
  key: bigint,
  value: DiscordenoThread
): Promise<Collection<bigint, DiscordenoThread>>;
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

async function get(table: "threads", key: bigint): Promise<DiscordenoThread | undefined>;
async function get(table: "guilds", key: bigint): Promise<DiscordenoGuild | undefined>;
async function get(table: "channels", key: bigint): Promise<DiscordenoChannel | undefined>;
async function get(table: "messages", key: bigint): Promise<DiscordenoMessage | undefined>;
async function get(table: "members", key: bigint): Promise<DiscordenoMember | undefined>;
async function get(table: "presences", key: bigint): Promise<PresenceUpdate | undefined>;
async function get(table: "unavailableGuilds", key: bigint): Promise<number | undefined>;
async function get(table: TableName, key: bigint) {
  return cache[table].get(key);
}

// callback: (value: DiscordenoThread, key: bigint, map: Map<bigint, DiscordenoThread>) => void
async function forEach(type: "DELETE_MESSAGES_FROM_CHANNEL", options: { channelId: bigint }): Promise<void>;
async function forEach(type: "DELETE_MESSAGES_FROM_GUILD", options: { guildId: bigint }): Promise<void>;
async function forEach(type: "DELETE_CHANNELS_FROM_GUILD", options: { guildId: bigint }): Promise<void>;
async function forEach(type: "DELETE_GUILD_FROM_MEMBER", options: { guildId: bigint }): Promise<void>;
async function forEach(type: "DELETE_ROLE_FROM_MEMBER", options: { guildId: bigint; roleId: bigint }): Promise<void>;
async function forEach(
  type:
    | "DELETE_MESSAGES_FROM_CHANNEL"
    | "DELETE_MESSAGES_FROM_GUILD"
    | "DELETE_CHANNELS_FROM_GUILD"
    | "DELETE_GUILD_FROM_MEMBER"
    | "DELETE_ROLE_FROM_MEMBER",
  options?: Record<string, unknown>
) {
  if (type === "DELETE_MESSAGES_FROM_CHANNEL") {
    cache.messages.forEach((message) => {
      if (message.channelId === options?.channelId) cache.messages.delete(message.id);
    });
    return;
  }

  if (type === "DELETE_MESSAGES_FROM_GUILD") {
    cache.messages.forEach((message) => {
      if (message.guildId === options?.guildId) cache.messages.delete(message.id);
    });
    return;
  }

  if (type === "DELETE_CHANNELS_FROM_GUILD") {
    cache.channels.forEach((channel) => {
      if (channel.guildId === options?.guildId) cache.channels.delete(channel.id);
    });
    return;
  }

  if (type === "DELETE_GUILD_FROM_MEMBER") {
    cache.members.forEach((member) => {
      if (!member.guilds.has(options?.guildId as bigint)) return;

      member.guilds.delete(options?.guildId as bigint);

      if (!member.guilds.size) {
        return cache.members.delete(member.id);
      }

      cache.members.set(member.id, member);
    });
    return;
  }

  if (type === "DELETE_ROLE_FROM_MEMBER") {
    cache.members.forEach((member) => {
      // Not in the relevant guild so just skip
      if (!member.guilds.has(options?.guildId as bigint)) return;

      const guildMember = member.guilds.get(options?.guildId as bigint)!;

      guildMember.roles = guildMember.roles.filter((id) => id !== (options?.roleId as bigint));
      cache.members.set(member.id, member);
    });
    return;
  }
}

async function filter(
  type: "GET_MEMBERS_IN_GUILD",
  options: { guildId: bigint }
): Promise<Collection<bigint, DiscordenoMember>>;
async function filter(
  type: "GET_MEMBERS_IN_GUILD",
  options?: Record<string, unknown>
): Promise<Collection<bigint, DiscordenoMember> | undefined> {
  if (type === "GET_MEMBERS_IN_GUILD") {
    return cache.members.filter((member) => member.guilds.has(options?.guildId as bigint));
  }
}
