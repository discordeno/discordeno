import {
  BigString,
  Bot,
  Channel,
  Collection,
  Guild,
  GuildToggles,
  Member,
  Message,
  Role,
  User,
} from "discordeno";
import { setupCacheCreations } from "./setupCacheCreations";
import { setupCacheEdits, unavailablesGuilds } from "./setupCacheEdits";
import { BotWithProxyEvents } from "./events";
import { setupCacheRemovals } from "./setupCacheRemovals";

export interface ProxyCacheProps<T extends ProxyCacheTypes> {
  events: BotWithProxyEvents;
  cache: Bot["cache"] & {
    options: CreateProxyCacheOptions;
    guilds: {
      memory: Collection<bigint, T["guild"]>;
      get: (id: bigint) => Promise<T["guild"] | undefined>;
      set: (value: T["guild"]) => Promise<void>;
      delete: (id: bigint) => Promise<void>;
    };
    channels: {
      guildIDs: Collection<bigint, bigint>;
      memory: Collection<bigint, T["channel"]>;
      /**
       * @param id Channel ID
       * @param guildId Guild ID (Only required if option fetchIfMissing.channels is set to true)
       */
      get: (id: bigint, guildID?: bigint) => Promise<T["channel"] | undefined>;
      set: (value: T["channel"]) => Promise<void>;
      delete: (id: bigint) => Promise<void>;
    };
    roles: {
      guildIDs: Collection<bigint, bigint>;
      memory: Collection<bigint, T["role"]>;
      /**
       * @param id Role ID
       * @param guildId Guild ID (Only required if option fetchIfMissing.roles is set to true)
       */
      get: (id: bigint, guildId?: bigint) => Promise<T["role"] | undefined>;
      set: (value: T["role"]) => Promise<void>;
      delete: (id: bigint) => Promise<void>;
    };
    members: {
      memory: Collection<bigint, T["member"]>;
      get: (id: bigint, guildId: bigint) => Promise<T["member"] | undefined>;
      set: (value: T["member"]) => Promise<void>;
      delete: (id: bigint, guildId: bigint) => Promise<void>;
    };
    messages: {
      channelIDs: Collection<bigint, bigint>;
      memory: Collection<bigint, T["message"]>;
      /**
       * @param id Message ID
       * @param channelId Channel ID (Only required if option fetchIfMissing.messages is set to true)
       * @param guildId Guild ID (Only required if option fetchIfMissing.messages is set to true)
       */
      get: (id: bigint, channelId?: bigint, guildId?: bigint) => Promise<T["message"] | undefined>;
      set: (value: T["message"]) => Promise<void>;
      delete: (id: bigint) => Promise<void>;
    };
    users: {
      memory: Collection<bigint, T["user"]>;
      get: (id: bigint) => Promise<T["user"] | undefined>;
      set: (value: T["user"]) => Promise<void>;
      delete: (id: bigint) => Promise<void>;
    };
  };
}

export type BotWithProxyCache<
  T extends ProxyCacheTypes,
  B extends Bot = Bot
> = Omit<B, "cache"> & ProxyCacheProps<T>;

export function createProxyCache<
  T extends ProxyCacheTypes<boolean> = ProxyCacheTypes,
  B extends Bot = Bot
>(rawBot: B, options: CreateProxyCacheOptions): BotWithProxyCache<T, B> {
  console.warn("WARNING: This plugin is still under developement, so beware when using it. There maybe bugs.")
  // @ts-ignore why is this failing?
  const bot = rawBot as BotWithProxyCache<T, B>;

  bot.enabledPlugins.add("PROXY_CACHE");

  bot.cache.options = options;

  if (!bot.cache.options.cacheInMemory)
    bot.cache.options.cacheInMemory = { default: true };
  if (!bot.cache.options.cacheOutsideMemory)
    bot.cache.options.cacheOutsideMemory = { default: false };

  const cacheInMemoryDefault = bot.cache.options.cacheInMemory.default;
  const cacheOutsideMemoryDefault =
    bot.cache.options.cacheOutsideMemory.default;

  bot.cache.options.cacheInMemory = {
    guilds: cacheInMemoryDefault,
    users: cacheInMemoryDefault,
    channels: cacheInMemoryDefault,
    members: cacheInMemoryDefault,
    roles: cacheInMemoryDefault,
    messages: cacheInMemoryDefault,
    ...bot.cache.options.cacheInMemory,
  };

  bot.cache.options.cacheOutsideMemory = {
    guilds: cacheOutsideMemoryDefault,
    users: cacheOutsideMemoryDefault,
    channels: cacheOutsideMemoryDefault,
    members: cacheOutsideMemoryDefault,
    roles: cacheOutsideMemoryDefault,
    messages: cacheOutsideMemoryDefault,
    ...bot.cache.options.cacheOutsideMemory,
  };

  const internalBulkRemover = {
    removeChannel: async function (id: bigint) {
      // Remove from in memory as well
      bot.cache.messages.memory.forEach((message) => {
        if (message.channelId === id) bot.cache.messages.memory.delete(id);
        bot.cache.messages.channelIDs.delete(id);
      });

      bot.cache.channels.memory.delete(id);
    },
    removeRole: async function (id: bigint) {
      // Delete the role itself if it exists
      bot.cache.roles.memory.delete(id);

      const guildID = bot.cache.roles.guildIDs.get(id);
      if (guildID) {
        // Get the guild if its in cache and Call the Fetcher if its not in cache
        const guild = bot.cache.guilds.memory.get(guildID) ?? bot.cache.guilds.memory.get(guildID);
        if (guild) {
          // if roles are stored inside the guild remove it
          guild.roles?.delete(id);
          // Each memwho has this role needs to be edited and the role id removed
          guild.members?.forEach((member: { roles: bigint[] }) => {
            if (member.roles?.includes(id))
              member.roles = member.roles.filter(
                (roleID: bigint) => roleID !== id
              );
          });
        }
      }

      bot.cache.roles.guildIDs.delete(id);

      // if members are stored outside guilds, then each member itself needs to remove the role id that was deleted.
      bot.cache.members.memory.forEach((member) => {
        if (member.roles?.includes(id))
          member.roles = member.roles.filter((roleID: bigint) => roleID !== id);
      });
    },
    removeMessages: async function (ids: bigint[]) {
      const channelID = ids.find((id) => bot.cache.messages.channelIDs.get(id));
      if (channelID) {
        const guildID = bot.cache.channels.guildIDs.get(channelID);
        if (guildID) {
        const guild = bot.cache.guilds.memory.get(guildID) ?? bot.cache.guilds.memory.get(guildID);
          if (guild) {
            const channel = guild.channels.get(channelID);
            if (channel) for (const id of ids) channel.messages?.delete(id);
          }
        }

        const channel = bot.cache.channels.memory.get(channelID);
        if (channel) {
          for (const id of ids) channel.messages?.delete(id);
        }
      }

      for (const id of ids) {
        // delete directly from memory if stored separately.
        bot.cache.messages.memory.delete(id);
        bot.cache.messages.channelIDs.delete(id);
      }
    },
    removeGuild: async function (id: bigint) {
      // Remove from memory
      bot.cache.guilds.memory.delete(id);

      // Remove any associated messages
      bot.cache.messages.memory.forEach((message) => {
        if (message.guildId === id) {
          bot.cache.messages.memory.delete(message.id);
          bot.cache.messages.channelIDs.delete(message.id);
        }
      });

      // Remove any associated channels
      bot.cache.channels.memory.forEach((channel) => {
        if (channel.guildId === id) {
          bot.cache.channels.memory.delete(channel.id);
          bot.cache.channels.guildIDs.delete(channel.id);
        }
      });

      // Remove any associated roles
      bot.cache.roles.memory.forEach((role) => {
        if (role.guildId === id) {
          bot.cache.roles.memory.delete(role.id);
          bot.cache.roles.guildIDs.delete(role.id);
        }
      });

      // Remove any associated members
      bot.cache.members.memory.forEach((member) => {
        if (member.guildId === id) {
          bot.cache.members.memory.delete(
            BigInt(`${member.id}${member.guildID}`)
          );
        }
      });
    },
  };

  const fetchers = {
    fetchGuild: async (id: bigint, getMemory?: boolean): 
    Promise<NonNullable<Awaited<T["guild"]>> | undefined> => {
      // Return nothing if we don't want fetching
      if (!options.fetchIfMissing?.guilds) return;
      // Check if Guild is unavailable
      if (unavailablesGuilds.has(id)) return;
      
      // Fetch Guild through Helpers
      const guild = await bot.helpers.getGuild(id);

      // Set Guild in cache
      await bot.cache.guilds.set(guild);

      // Some function calls accept memory data, so lets return that instead
      if (getMemory) return bot.cache.guilds.memory.get(id);
      // Return from cache so we dont have to handle stuff like shouldCache twice
      return bot.cache.guilds.get(id);
    },
    fetchRole: async (guildId: bigint, roleId: bigint) => {
      if (!options.fetchIfMissing?.roles) return;
      if (unavailablesGuilds.has(guildId)) return;

      const roles = await bot.helpers.getRoles(guildId);

      await Promise.all(roles.map((r) => bot.cache.roles.set(r)));

      return bot.cache.roles.get(roleId);
    },
    fetchChannel: async (guildId: bigint, channelId: bigint) => {
      if (!options.fetchIfMissing?.channels) return;
      if (unavailablesGuilds.has(guildId)) return;

      const channel = await bot.helpers.getChannel(channelId);

      await bot.cache.channels.set(channel)

      return bot.cache.channels.get(channelId);
    },
    fetchMember: async (guildId: bigint, memberId: bigint) => {
      if (!options.fetchIfMissing?.members) return;
      if (unavailablesGuilds.has(guildId)) return;

      const member = await bot.helpers.getMember(guildId, memberId);

      await bot.cache.members.set(member)

      return bot.cache.members.get(memberId, guildId);
    },
    fetchUser: async (userId: bigint) => {
      if (!options.fetchIfMissing?.users) return;

      const user = await bot.helpers.getUser(userId);

      await bot.cache.users.set(user)

      return bot.cache.users.get(userId);
    },
    fetchMessage: async (messageId: bigint, guildId: bigint, channelId: bigint) => {
      if (!options.fetchIfMissing?.messages) return;
      if (unavailablesGuilds.has(guildId)) return;

      const message = await bot.helpers.getMessage(channelId, messageId);

      await bot.cache.messages.set(message)

      return bot.cache.messages.get(messageId);
    }
  }

  if (!bot.cache.options.bulk) bot.cache.options.bulk = {};

  // Get bulk removers passed by user, data about which internal removers to replace
  const { removeChannel, removeGuild, removeMessages, removeRole } =
    bot.cache.options.bulk;
  const { replaceInternalBulkRemover } = bot.cache.options.bulk;

  // If user passed bulk.removeChannel else if replaceInternalBulkRemover.channel is not set to true
  if (removeChannel || !replaceInternalBulkRemover?.channel) {
    bot.cache.options.bulk.removeChannel = async function (id) {
      // If replaceInternalBulkRemover.channel is not set to true, run internal channel bulk remover
      if (!replaceInternalBulkRemover?.channel)
        await internalBulkRemover.removeChannel(id);
      // If user passed bulk.removeChannel, run passed bulk remover
      await removeChannel?.(id);
    };
  }

  // If user passed bulk.removeRole else if replaceInternalBulkRemover.role is not set to true
  if (removeRole || !replaceInternalBulkRemover?.role) {
    bot.cache.options.bulk.removeRole = async function (id) {
      // If replaceInternalBulkRemover.role is not set to true, run internal role bulk remover
      if (!replaceInternalBulkRemover?.role)
        await internalBulkRemover.removeRole(id);
      // If user passed bulk.removeRole, run passed bulk remover
      await removeRole?.(id);
    };
  }

  // If user passed bulk.removeMessages else if replaceInternalBulkRemover.message is not set to true
  if (removeMessages || !replaceInternalBulkRemover?.messages) {
    bot.cache.options.bulk.removeMessages = async function (id) {
      // If replaceInternalBulkRemover.message is not set to true, run internal messages bulk remover
      if (!replaceInternalBulkRemover?.messages)
        await internalBulkRemover.removeMessages(id);
      // If user passed bulk.removeMessages, run passed bulk remover
      await removeMessages?.(id);
    };
  }

  // If user passed bulk.removeGuild else if replaceInternalBulkRemover.guild is not set to true
  if (removeGuild || !replaceInternalBulkRemover?.guild) {
    bot.cache.options.bulk.removeGuild = async function (id) {
      // If replaceInternalBulkRemover.guild is not set to true, run internal guild bulk remover
      if (!replaceInternalBulkRemover?.guild)
        await internalBulkRemover.removeGuild(id);
      // If user passed bulk.removeGuild, run passed bulk remover
      await removeGuild?.(id);
    };
  }

  bot.cache.guilds = {
    memory: new Collection<bigint, T["guild"]>(),
    get: async function (id: BigString): Promise<T["guild"] | undefined> {
      // Force into bigint form
      const guildID = BigInt(id);

      // If available in memory, use it.
      if (options.cacheInMemory?.guilds && bot.cache.guilds.memory.has(guildID))
        return bot.cache.guilds.memory.get(guildID);
      // Otherwise try to get from non-memory cache
      if (!options.cacheOutsideMemory?.guilds || !options.getItem) return;

      const stored = await options.getItem<T["guild"]>("guild", guildID);
      if (stored && options.cacheInMemory?.guilds)
        bot.cache.guilds.memory.set(guildID, stored);
      return stored;
    },
    set: async function (guild: T["guild"]): Promise<void> {
      // Should this be cached or not?
      if (
        options.shouldCache?.guild &&
        !(await options.shouldCache.guild(guild))
      )
        return;
      // If user wants memory cache, we cache it
      if (options.cacheInMemory?.guilds)
        bot.cache.guilds.memory.set(guild.id, guild);
      // If user wants non-memory cache, we cache it
      if (options.cacheOutsideMemory?.guilds)
        if (options.setItem) await options.setItem("guild", guild);
    },
    delete: async function (id: BigString): Promise<void> {
      // Force id to bigint
      const guildID = BigInt(id);
      // Remove from memory
      bot.cache.guilds.memory.delete(guildID);
      // Remove from non-memory cache
      await options.bulk?.removeGuild?.(guildID);
    },
  };

  bot.cache.users = {
    memory: new Collection<bigint, T["user"]>(),
    get: async function (id: BigString): Promise<T["user"] | undefined> {
      // Force into bigint form
      const userID = BigInt(id);

      // If available in memory, use it.
      if (options.cacheInMemory?.users && bot.cache.users.memory.has(userID))
        return bot.cache.users.memory.get(userID);
      // Otherwise try to get from non-memory cache
      if (!options.cacheOutsideMemory?.users || !options.getItem) return;

      const stored = await options.getItem<T["user"]>("user", userID);
      if (stored && options.cacheInMemory?.users) {
        bot.cache.users.memory.set(userID, stored);
      }

      if (stored) return stored;

      if (options.fetchIfMissing?.users) {
        return fetchers.fetchUser(userID);
      }

      return;
    },
    set: async function (user: T["user"]): Promise<void> {
      if (options.shouldCache?.user && !(await options.shouldCache.user(user)))
        return;

      // If user wants memory cache, we cache it
      if (options.cacheInMemory?.users)
        bot.cache.users.memory.set(user.id, user);
      // If user wants non-memory cache, we cache it
      if (options.cacheOutsideMemory?.users)
        if (options.setItem) await options.setItem("user", user);
    },
    delete: async function (id: BigString): Promise<void> {
      // Force id to bigint
      const userID = BigInt(id);
      // Remove from memory
      bot.cache.users.memory.delete(userID);
      // Remove from non-memory cache
      if (options.removeItem) await options.removeItem("user", userID);
    },
  };

  bot.cache.roles = {
    guildIDs: new Collection<bigint, bigint>(),
    memory: new Collection<bigint, T["role"]>(),
    get: async function (id: BigString, guildId?: BigString): Promise<T["role"] | undefined> {
      // Force into bigint form
      const roleID = BigInt(id);

      // If available in memory, use it.
      if (options.cacheInMemory?.roles) {
        // If guilds are cached, roles will be inside them
        if (options.cacheInMemory?.guilds) {
          const guildID = bot.cache.roles.guildIDs.get(roleID);
          if (guildID) {
            const role = bot.cache.guilds.memory
              .get(guildID)
              ?.roles?.get(roleID);
            if (role) return role;
          }
        } else if (bot.cache.roles.memory.has(roleID)) {
          // Check if its in memory outside of guilds
          return bot.cache.roles.memory.get(roleID);
        }
      }

      // Otherwise try to get from non-memory cache
      if (!options.cacheOutsideMemory?.roles || !options.getItem) return;

      const stored = await options.getItem<T["role"]>("role", roleID);
      if (stored && options.cacheInMemory?.roles) {
        bot.cache.roles.memory.set(roleID, stored);
      }

      // If its stored, return that
      if (stored) return stored;

      // If neither stored nor memory has the role and fetching is enabled, fetch it
      if (options.fetchIfMissing?.roles && guildId) {
        return fetchers.fetchRole(BigInt(guildId), roleID)
      }

      if (options.fetchIfMissing?.roles) {
        console.error(new Error('"fetchIfMissing?.roles" is set to true but guild ID was not provided'));
      }

      // else return nothing
      return;
    },
    set: async function (role: T["role"]): Promise<void> {
      if (options.shouldCache?.role && !(await options.shouldCache.role(role)))
        return;

      // If user wants memory cache, we cache it
      if (options.cacheInMemory?.roles) {
        if (role.guildId) bot.cache.roles.guildIDs.set(role.id, role.guildId);

        if (options.cacheInMemory?.guilds) {
          const guildID = bot.cache.roles.guildIDs.get(role.id);
          if (guildID) {
            const guild = bot.cache.guilds.memory.get(guildID) ?? await fetchers.fetchGuild(guildID, true);
            if (guild) guild.roles.set(role.id, role);
            else
              console.warn(
                `[CACHE] Can't cache role(${role.id}) since guild.roles is enabled but a guild (${guildID}) was not found`
              );
          } else
            console.warn(
              `[CACHE] Can't cache role(${role.id}) since guild.roles is enabled but a guild id was not found.`
            );
        } else bot.cache.roles.memory.set(role.id, role);
      }
      // If user wants non-memory cache, we cache it
      if (options.cacheOutsideMemory?.roles)
        if (options.setItem) await options.setItem("role", role);
    },
    delete: async function (id: BigString): Promise<void> {
      // Force id to bigint
      const roleID = BigInt(id);
      // Remove from memory
      bot.cache.roles.memory.delete(roleID);
      bot.cache.guilds.memory
        .get(bot.cache.roles.guildIDs.get(roleID)!)
        ?.roles?.delete(roleID);
      bot.cache.roles.guildIDs.delete(roleID);
      // Remove from non-memory cache
      if (options.removeItem) await options.removeItem("role", roleID);
    },
  };

  bot.cache.members = {
    memory: new Collection<bigint, T["member"]>(),
    get: async function (
      id: BigString,
      guildId: BigString
    ): Promise<T["member"] | undefined> {
      // Force into bigint form
      const memberID = BigInt(id);
      const guildID = BigInt(guildId);

      // If available in memory, use it.
      if (options.cacheInMemory?.members) {
        // If guilds are cached, members will be inside them
        if (options.cacheInMemory?.guilds) {
          const member = bot.cache.guilds.memory
            .get(guildID)
            ?.members?.get(memberID);
          if (member) return member;
        } else if (
          bot.cache.members.memory.has(BigInt(`${memberID}${guildId}`))
        ) {
          // Check if its in memory outside of guilds
          return bot.cache.members.memory.get(BigInt(`${memberID}${guildId}`));
        }
      }

      // Otherwise try to get from non-memory cache
      if (!options.cacheOutsideMemory?.members || !options.getItem) return;

      const stored = await options.getItem<T["member"]>(
        "member",
        memberID,
        guildID
      );
      if (stored && options.cacheInMemory?.members) {
        bot.cache.members.memory.set(BigInt(`${memberID}${guildId}`), stored);
      }

      if (stored) return stored;

      if (options.fetchIfMissing?.members) {
        fetchers.fetchMember(guildID, memberID);
      }

      return
    },
    set: async function (member: T["member"]): Promise<void> {
      if (
        options.shouldCache?.member &&
        !(await options.shouldCache.member(member))
      )
        return;

      // If user wants memory cache, we cache it
      if (options.cacheInMemory?.members) {
        if (options.cacheInMemory?.guilds) {
          if (member.guildId) {
            const guild = bot.cache.guilds.memory.get(member.guildId) ?? await fetchers.fetchGuild(member.guildId, true);
            if (guild) guild.members.set(member.id, member);
            else
              console.warn(
                `[CACHE] Can't cache member(${member.id}) since guild.members is enabled but a guild (${member.guildId}) was not found`
              );
          } else
            console.warn(
              `[CACHE] Can't cache member(${member.id}) since guild.members is enabled but a guild id was not found.`
            );
        } else
          bot.cache.members.memory.set(
            BigInt(`${member.id}${member.guildId}`),
            member
          );
      }
      // If user wants non-memory cache, we cache it
      if (options.cacheOutsideMemory?.members)
        if (options.setItem) await options.setItem("member", member);
    },
    delete: async function (id: BigString, guildId: BigString): Promise<void> {
      // Force id to bigint
      const memberID = BigInt(id);
      const guildID = BigInt(guildId);

      // Remove from memory
      bot.cache.members.memory.delete(BigInt(`${memberID}${guildId}`));
      bot.cache.guilds.memory.get(guildID)?.members?.delete(memberID);
      // Remove from non-memory cache
      if (options.removeItem)
        await options.removeItem("member", memberID, guildID);
    },
  };

  bot.cache.channels = {
    guildIDs: new Collection<bigint, bigint>(),
    memory: new Collection<bigint, T["channel"]>(),
    get: async function (id: BigString, guildID?: BigString): Promise<T["channel"] | undefined> {
      // Force into bigint form
      const channelID = BigInt(id);

      // If available in memory, use it.
      if (options.cacheInMemory?.channels) {
        // If guilds are cached, channels will be inside them
        if (options.cacheInMemory?.guilds) {
          const guildID = bot.cache.channels.guildIDs.get(channelID);
          if (guildID) {
            const channel = bot.cache.guilds.memory
              .get(guildID)
              ?.channels?.get(channelID);
            if (channel) return channel;
          } else {
            // Return from cache.channels if this channel isn't in a guild
            const channel = bot.cache.channels.memory.get(channelID);
            if (channel) return channel;
          }
        } else if (bot.cache.channels.memory.has(channelID)) {
          // Check if its in memory outside of guilds
          return bot.cache.channels.memory.get(channelID);
        }
      }

      // Otherwise try to get from non-memory cache
      if (!options.cacheOutsideMemory?.channels || !options.getItem) return;

      const stored = await options.getItem<T["channel"]>("channel", channelID);
      if (stored && options.cacheInMemory?.channels) {
        bot.cache.channels.memory.set(channelID, stored);
      }

      // If its stored, return that
      if (stored) return stored;

      // If neither stored nor memory has the channel and fetching is enabled, fetch it
      if (options.fetchIfMissing?.channels && guildID) {
        return fetchers.fetchChannel(BigInt(guildID), channelID)
      }

      if (options.fetchIfMissing?.channels) {
        console.error(new Error('"fetchIfMissing?.channels" is set to true but guild ID was not provided'));
      }

      // else return nothing
      return;
    },
    set: async function (channel: T["channel"]): Promise<void> {
      if (
        options.shouldCache?.channel &&
        !(await options.shouldCache.channel(channel))
      )
        return;

      // If user wants memory cache, we cache it
      if (options.cacheInMemory?.channels) {
        if (channel.guildId)
          bot.cache.channels.guildIDs.set(channel.id, channel.guildId);

        if (options.cacheInMemory?.guilds) {
          const guildID = bot.cache.channels.guildIDs.get(channel.id);
          if (guildID) {
            const guild = bot.cache.guilds.memory.get(guildID) ?? await fetchers.fetchGuild(guildID, true);
            if (guild) guild.channels.set(channel.id, channel);
            else
              console.warn(
                `[CACHE] Can't cache channel(${channel.id}) since guild.channels is enabled but a guild (${guildID}) was not found`
              );
          } else
            console.warn(
              `[CACHE] Can't cache channel(${channel.id}) since guild.channels is enabled but a guild id was not found.`
            );
        } else bot.cache.channels.memory.set(channel.id, channel);
      }
      // If user wants non-memory cache, we cache it
      if (options.cacheOutsideMemory?.channels)
        if (options.setItem) await options.setItem("channel", channel);
    },
    delete: async function (id: BigString): Promise<void> {
      // Force id to bigint
      const channelID = BigInt(id);
      // Remove from memory
      bot.cache.channels.memory.delete(channelID);
      bot.cache.guilds.memory
        .get(bot.cache.channels.guildIDs.get(channelID)!)
        ?.channels?.delete(channelID);
      bot.cache.channels.guildIDs.delete(channelID);
      // Remove from non-memory cache
      if (options.removeItem) await options.removeItem("channel", channelID);
    },
  };

  bot.cache.messages = {
    channelIDs: new Collection<bigint, bigint>(),
    memory: new Collection<bigint, T["message"]>(),
    get: async function (id: BigString, channelId?: BigString, guildId?: BigString): Promise<T["message"] | undefined> {
      // Force into bigint form
      const messageID = BigInt(id);

      // If available in memory, use it.
      if (options.cacheInMemory?.messages) {
        // If guilds are cached, messages will be inside them
        if (options.cacheInMemory?.guilds) {
          const channelID = bot.cache.messages.channelIDs.get(messageID);
          if (channelID) {
            const guildID = bot.cache.channels.guildIDs.get(channelID);
            const channel =
              bot.cache.guilds.memory.get(guildID!)?.channel ??
              bot.cache.channels.memory.get(channelID);
            if (channel) {
              const message = channel.messages.cache.get(messageID);
              if (message) return message;
            }
          }
        }

        // Check if its in memory outside of guilds
        if (bot.cache.messages.memory.has(messageID)) {
          return bot.cache.messages.memory.get(messageID);
        }
      }

      // Otherwise try to get from non-memory cache
      if (!options.cacheOutsideMemory?.messages || !options.getItem) return;

      const stored = await options.getItem<T["message"]>("message", messageID);
      if (stored && options.cacheInMemory?.messages) {
        bot.cache.messages.memory.set(messageID, stored);
      }

      if (stored) return stored;

      if (options.fetchIfMissing?.messages && channelId && guildId) {
        return fetchers.fetchMessage(messageID, BigInt(guildId), BigInt(channelId));
      }

      if (options.fetchIfMissing?.messages) {
        console.error(new Error('"fetchIfMissing?.messages" is set to true but guild ID or channel ID was not provided'));
      }

      return;
    },
    set: async function (message: T["message"]): Promise<void> {
      if (
        options.shouldCache?.message &&
        !(await options.shouldCache.message(message))
      )
        return;

      // If user wants memory cache, we cache it
      if (options.cacheInMemory?.messages) {
        if (options.cacheInMemory?.guilds) {
          if (message.channelId)
            bot.cache.messages.channelIDs.set(message.id, message.channelId);

          const guildID = bot.cache.messages.channelIDs.get(message.id);
          if (guildID) {
            const guild = bot.cache.guilds.memory.get(guildID) ?? await fetchers.fetchGuild(guildID, true);
            if (guild) guild.messages.set(message.id, message);
            else
              console.warn(
                `[CACHE] Can't cache message(${message.id}) since guild.messages is enabled but a guild (${guildID}) was not found`
              );
          } else
            console.warn(
              `[CACHE] Can't cache message(${message.id}) since guild.messages is enabled but a guild id was not found.`
            );
        } else bot.cache.messages.memory.set(message.id, message);
      }
      // If user wants non-memory cache, we cache it
      if (options.cacheOutsideMemory?.messages)
        if (options.setItem) await options.setItem("message", message);
    },
    delete: async function (id: BigString): Promise<void> {
      // Force id to bigint
      const messageID = BigInt(id);
      // Remove from memory
      bot.cache.messages.memory.delete(messageID);
      bot.cache.guilds.memory
        .get(bot.cache.messages.channelIDs.get(messageID)!)
        ?.messages?.delete(messageID);
      bot.cache.messages.channelIDs.delete(messageID);
      // Remove from non-memory cache
      if (options.removeItem) await options.removeItem("message", messageID);
    },
  };

  // MODIFY TRANSFORMERS
  const { user, role, member, guild, channel, message } = bot.transformers;

  bot.transformers.user = function (_, payload) {
    // Create the object from existing transformer.
    const old = user(bot, payload);

    // Filter to desired args
    const args: T["user"] = {};
    const keys = Object.keys(old) as (keyof User)[];

    for (const key of keys) {
      // ID prop is required. Desired props take priority.
      if (key === "id" || options.desiredProps?.users?.includes(key))
        args[key] = old[key];
      // If undesired we skip
      else if (options.undesiredProps?.users?.includes(key)) continue;
      // If user did not say this is undesired and did not provide any desired props we accept it
      else if (!options.desiredProps?.users?.length) args[key] = old[key];
    }

    // Add to memory
    bot.cache.users.set(args);

    return args;
  };

  bot.transformers.guild = function (_, payload) {
    if (options.cacheInMemory?.guilds) {
      // Get the guild id in bigint
      const guildId = bot.transformers.snowflake(payload.guild.id);
      // Make a raw guild object we can put in memory before running the old transformer which runs all the other transformers
      const preCacheGuild = {
        toggles: new GuildToggles(payload.guild),
        name: payload.guild.name,
        memberCount: payload.guild.member_count ?? 0,
        shardId: payload.shardId,
        icon: payload.guild.icon
          ? bot.utils.iconHashToBigInt(payload.guild.icon)
          : undefined,
        channels: new Collection<bigint, T["channel"]>(),
        roles: new Collection<bigint, T["role"]>(),
        id: guildId,
        // WEIRD EDGE CASE WITH BOT CREATED SERVERS
        ownerId: payload.guild.owner_id
          ? bot.transformers.snowflake(payload.guild.owner_id)
          : 0n,
      };

      // CACHE DIRECT TO MEMORY BECAUSE OTHER TRANSFORMERS NEED THE GUILD IN CACHE
      bot.cache.guilds.memory.set(preCacheGuild.id, preCacheGuild);
    }

    // Create the object from existing transformer.
    const old = guild(bot, payload);

    options.shouldCache?.guild?.(old).then((shouldCache) => {
      if (!shouldCache) bot.cache.guilds.memory.delete(old.id);
    });

    // Filter to desired args
    const args: T["guild"] = {
      members: new Collection(),
    };
    const keys = Object.keys(old) as (keyof Guild)[];

    for (const key of keys) {
      // ID is required. Desired props take priority.
      if (key === "id" || options.desiredProps?.guilds?.includes(key))
        args[key] = old[key];
      // If undesired we skip
      else if (options.undesiredProps?.guilds?.includes(key)) continue;
      // If guild did not say this is undesired and did not provide any desired props we accept it
      else if (!options.desiredProps?.guilds?.length) args[key] = old[key];
    }

    // Add to memory
    bot.cache.guilds.set(args);

    return args;
  };

  bot.transformers.channel = function (_, payload) {
    // Create the object from existing transformer.
    const old = channel(bot, payload);
    old.messages = new Collection();

    // Filter to desired args
    const args: T["channel"] = {};
    const keys = Object.keys(old) as (keyof Channel)[];

    for (const key of keys) {
      // ID is required. Desired props take priority.
      if (key === "id" || options.desiredProps?.channels?.includes(key))
        args[key] = old[key];
      // If undesired we skip
      else if (options.undesiredProps?.channels?.includes(key)) continue;
      // If channel did not say this is undesired and did not provide any desired props we accept it
      else if (!options.desiredProps?.channels?.length) args[key] = old[key];
    }

    // Add to memory
    bot.cache.channels.set(args);

    return args;
  };

  bot.transformers.member = function (_, payload, guildId, userId) {
    // Create the object from existing transformer.
    const old = member(bot, payload, guildId, userId);

    // Filter to desired args
    const args: T["member"] = {};
    const keys = Object.keys(old) as (keyof Member)[];

    for (const key of keys) {
      // ID is required. Desired props take priority.
      if (key === "id" || options.desiredProps?.members?.includes(key))
        args[key] = old[key];
      // If undesired we skip
      else if (options.undesiredProps?.members?.includes(key)) continue;
      // If member did not say this is undesired and did not provide any desired props we accept it
      else if (!options.desiredProps?.members?.length) args[key] = old[key];
    }

    // Add to memory
    bot.cache.members.set(args);

    return args;
  };

  bot.transformers.role = function (_, payload) {
    // Create the object from existing transformer.
    const old = role(bot, payload);

    // Filter to desired args
    const args: T["role"] = {};
    const keys = Object.keys(old) as (keyof Role)[];

    for (const key of keys) {
      // ID is required. Desired props take priority.
      if (key === "id" || options.desiredProps?.roles?.includes(key))
        args[key] = old[key];
      // If undesired we skip
      else if (options.undesiredProps?.roles?.includes(key)) continue;
      // If role did not say this is undesired and did not provide any desired props we accept it
      else if (!options.desiredProps?.roles?.length) args[key] = old[key];
    }

    // Add to memory
    bot.cache.roles.set(args);

    return args;
  };

  bot.transformers.message = function (_, payload) {
    // Create the object from existing transformer.
    const old = message(bot, payload);

    // Filter to desired args
    const args: T["message"] = {};
    const keys = Object.keys(old) as (keyof Message)[];

    for (const key of keys) {
      // ID is required. Desired props take priority.
      if (key === "id" || options.desiredProps?.messages?.includes(key))
        args[key] = old[key];
      // If undesired we skip
      else if (options.undesiredProps?.messages?.includes(key)) continue;
      // If message did not say this is undesired and did not provide any desired props we accept it
      else if (!options.desiredProps?.messages?.length) args[key] = old[key];
    }

    // Add to memory
    bot.cache.messages.set(args);

    return args;
  };

  setupCacheRemovals(bot);
  setupCacheEdits(bot);
  setupCacheCreations(bot);

  return bot;
}

export type ProxyCacheTypes<T extends boolean = true> = {
  guild: T extends true ? Guild : any;
  user: T extends true ? User : any;
  channel: T extends true ? Channel : any;
  member: T extends true ? Member : any;
  role: T extends true ? Role : any;
  message: T extends true ? Message : any;
};

export interface CreateProxyCacheOptions {
  /** Configure the handlers that should be ran whenever something is about to be cached to determine whether it should or should not be cached. */
  shouldCache?: {
    /** Handler to check whether or not to cache this guild. */
    guild?: (guild: Guild) => Promise<boolean>;
    /** Handler to check whether or not to cache this user. */
    user?: (user: User) => Promise<boolean>;
    /** Handler to check whether or not to cache this channel. */
    channel?: (channel: Channel) => Promise<boolean>;
    /** Handler to check whether or not to cache this member. */
    member?: (member: Member) => Promise<boolean>;
    /** Handler to check whether or not to cache this role. */
    role?: (role: Role) => Promise<boolean>;
    /** Handler to check whether or not to cache this message. */
    message?: (message: Message) => Promise<boolean>;
  };
  /** Configure the exact properties you wish to have in each object. */
  desiredProps?: {
    /** The properties you want to keep in a user object. */
    users?: (keyof User)[];
    /** The properties you want to keep in a guild object. */
    guilds?: (keyof Guild)[];
    /** The properties you want to keep in a channel object. */
    channels?: (keyof Channel)[];
    /** The properties you want to keep in a member object. */
    members?: (keyof Member)[];
    /** The properties you want to keep in a role object. */
    roles?: (keyof Role)[];
    /** The properties you want to keep in a message object. */
    messages?: (keyof Message)[];
  };
  /** Configure the properties you do NOT want in each object. */
  undesiredProps?: {
    /** The properties you do NOT want in a user object. */
    users?: (keyof User)[];
    /** The properties you do NOT want in a guild object. */
    guilds?: (keyof Guild)[];
    /** The properties you do NOT want in a channel object. */
    channels?: (keyof Channel)[];
    /** The properties you do NOT want in a member object. */
    members?: (keyof Member)[];
    /** The properties you do NOT want in a role object. */
    roles?: (keyof Role)[];
    /** The properties you do NOT want in a message object. */
    messages?: (keyof Message)[];
  };
  /** Options to choose how the proxy will cache everything.
   *
   * By default, all props inside `cacheInMemory` are set to `true`. */
  cacheInMemory?: {
    /** Whether or not to cache guilds. */
    guilds?: boolean;
    /** Whether or not to cache users. */
    users?: boolean;
    /** Whether or not to cache channels. If guilds is enabled, then these are cached inside the guild object. */
    channels?: boolean;
    /** Whether or not to cache members. If guilds is enabled, then these are cached inside the guild object. */
    members?: boolean;
    /** Whether or not the cache roles. If guilds is enabled, then these are cached inside the guild object.*/
    roles?: boolean;
    /** Whether or not the cache messages. If channels is enabled, then these are cached inside the channel object.*/
    messages?: boolean;
    /** Default value for the properties that are not provided inside `cacheInMemory`. */
    default: boolean;
  };
  /** Options to choose how the proxy will cache in a separate persitant cache.
   *
   * By default, all props inside `cacheOutsideMemory` are set to `false`. */
  cacheOutsideMemory?: {
    /** Whether or not to cache guilds. */
    guilds?: boolean;
    /** Whether or not to cache users. */
    users?: boolean;
    /** Whether or not to cache channels. */
    channels?: boolean;
    /** Whether or not to cache members. */
    members?: boolean;
    /** Whether or not to cache roles. */
    roles?: boolean;
    /** Whether or not to cache messages. */
    messages?: boolean;
    /** Default value for the properties that are not provided inside `cacheOutsideMemory`. */
    default: boolean;
  };
  /** Handler to get an object from a specific table. */
  getItem?: <T>(
    ...args:
      | [table: "guild" | "channel" | "role" | "message" | "user", id: bigint]
      | [table: "member", id: bigint, guildId: bigint]
  ) => Promise<T>;
  /** Handler to set an object in a specific table. */
  setItem?: (
    table: "guild" | "channel" | "role" | "member" | "message" | "user",
    item: any
  ) => Promise<unknown>;
  /** Handler to delete an object in a specific table. */
  removeItem?: (
    ...args:
      | [table: "guild" | "channel" | "role" | "message" | "user", id: bigint]
      | [table: "member", id: bigint, guildId: bigint]
  ) => Promise<unknown>;
  bulk?: {
    /** Handler used to remove multiple objects in bulk. Instead of making hundreds of queries, you can optimize here using your preferred form. For example, when a guild is deleted, you want to make sure all channels, roles, messages and members are removed as well. */
    removeGuild?: (id: bigint) => Promise<unknown>;
    /** Handler used to remove multiple objects in bulk. Instead of making hundreds of queries, you can optimize here using your preferred form. For example, when a channel is deleted, you want to make sure all messages are removed as well. */
    removeChannel?: (id: bigint) => Promise<unknown>;
    /** Handler used to remove multiple objects in bulk. Instead of making hundreds of queries, you can optimize here using your preferred form. For example, when a role is deleted, you want to make sure all members who have this role are edited as well. */
    removeRole?: (id: bigint) => Promise<unknown>;
    /** Handler used to remove multiple messages. */
    removeMessages?: (ids: bigint[]) => Promise<unknown>;
    /** Options to choose whether or not to replace internal removers. */
    replaceInternalBulkRemover?: {
      /** Whether or not to replace internal guild remover.
       *
       * By default, the proxy will bulk remove guilds from memory. You can override this behavior by setting this option to `true`.
       */
      guild?: boolean;
      /** Whether or not to replace internal channel remover.
       *
       * By default, the proxy will bulk remove channel from memory. You can override this behavior by setting this option to `true`.
       */
      channel?: boolean;
      /** Whether or not to replace internal role remover.
       *
       * By default, the proxy will bulk remove role from memory. You can override this behavior by setting this option to `true`.
       */
      role?: boolean;
      /** Whether or not to replace internal message remover.
       *
       * By default, the proxy will bulk remove message from memory. You can override this behavior by setting this option to `true`.
       */
      messages?: boolean;
    };
  };
    /** Whether or not to fetch something if it's missing */
  fetchIfMissing?: {
    guilds?: boolean,
    users?: boolean,
    roles?: boolean,
    channels?: boolean,
    members?: boolean,
    messages?: boolean,
  }
}

declare module "discordeno" {
  interface Channel {
    /** The messages that are available in this channel. */
    messages: Collection<bigint, Message>;
  }
}