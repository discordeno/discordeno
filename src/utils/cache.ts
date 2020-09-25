import { Collection } from "./collection.ts";
import type { Message } from "../structures/message.ts";
import type { Guild } from "../structures/guild.ts";
import type { Channel } from "../structures/channel.ts";
import type { PresenceUpdatePayload } from "../types/discord.ts";

export interface CacheData {
  isReady: boolean;
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  unavailableGuilds: Collection<string, number>;
  presences: Collection<string, PresenceUpdatePayload>;
  fetchAllMembersProcessingRequests: Collection<string, Function>;
}

export const cache: CacheData = {
  isReady: false,
  guilds: new Collection(),
  channels: new Collection(),
  messages: new Collection(),
  unavailableGuilds: new Collection(),
  presences: new Collection(),
  fetchAllMembersProcessingRequests: new Collection<string, Function>(),
};
