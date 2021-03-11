import { Collection } from "./collection.ts";

export const cache: CacheData = {
  isReady: false,
  guilds: new Collection(),
  channels: new Collection(),
  messages: new Collection(),
  members: new Collection(),
  unavailableGuilds: new Collection(),
  presences: new Collection(),
  fetchAllMembersProcessingRequests: new Collection(),
  executedSlashCommands: new Collection(),
};
