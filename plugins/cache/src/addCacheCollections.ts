import {
  Bot,
  Collection,
  DiscordenoChannel,
  DiscordenoGuild,
  DiscordenoMember,
  DiscordenoMessage,
  DiscordenoPresence,
  DiscordenoUser,
} from "../deps.ts";

export type BotWithCache<B extends Bot = Bot> = B & CacheProps;

export interface CacheProps extends Bot {
  guilds: Collection<bigint, DiscordenoGuild>;
  users: Collection<bigint, DiscordenoUser>;
  members: Collection<bigint, DiscordenoMember>;
  channels: Collection<bigint, DiscordenoChannel>;
  messages: Collection<bigint, DiscordenoMessage>;
  presences: Collection<bigint, DiscordenoPresence>;
  dispatchedGuildIds: Set<bigint>;
  dispatchedChannelIds: Set<bigint>;
  activeGuildIds: Set<bigint>;
}

export function addCacheCollections<B extends Bot>(bot: B): BotWithCache<B> {
  const cacheBot = bot as BotWithCache<B>;
  cacheBot.guilds = new Collection();
  cacheBot.users = new Collection();
  cacheBot.members = new Collection();
  cacheBot.channels = new Collection();
  cacheBot.messages = new Collection();
  cacheBot.presences = new Collection();
  cacheBot.dispatchedGuildIds = new Set();
  cacheBot.dispatchedChannelIds = new Set();
  cacheBot.activeGuildIds = new Set();

  return bot as BotWithCache<B>;
}
