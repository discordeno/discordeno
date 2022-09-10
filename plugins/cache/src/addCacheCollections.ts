import {
BigString,
  Bot,
  Channel,
  Collection,
  Guild,
  Member,
  Message,
  ModifyWebhook,
  PresenceUpdate,
  User,
  Webhook,
} from "../deps.ts";

export type BotWithCache<B extends Bot = Bot> = Omit<B, "helpers"> & CacheProps & {
  helpers: BotHelpersWithCache<B["helpers"]>;
};

export type BotHelpersWithCache<T> = Omit<T, "editWebhook"> & {
  /** The added channelId argument at the end is used to validate permission checks */
  editWebhook: (webhookId: BigString, options: ModifyWebhook, fromChannelId?: BigString) => Promise<Webhook>;
};

export interface CacheProps {
  guilds: Collection<BigString, Guild>;
  users: Collection<BigString, User>;
  members: Collection<BigString, Member>;
  channels: Collection<BigString, Channel>;
  messages: Collection<BigString, Message>;
  presences: Collection<BigString, PresenceUpdate>;
  dispatchedGuildIds: Set<BigString>;
  dispatchedChannelIds: Set<BigString>;
  activeGuildIds: Set<BigString>;
}

export function addCacheCollections<B extends Bot>(bot: B): BotWithCache<B> {
  const cacheBot = bot as unknown as BotWithCache<B>;
  cacheBot.guilds = new Collection();
  cacheBot.users = new Collection();
  cacheBot.members = new Collection();
  cacheBot.channels = new Collection();
  cacheBot.messages = new Collection();
  cacheBot.presences = new Collection();
  cacheBot.dispatchedGuildIds = new Set();
  cacheBot.dispatchedChannelIds = new Set();
  cacheBot.activeGuildIds = new Set();

  return cacheBot;
}
