import {
  Channel,
  Guild,
  Member,
  Message,
} from "../api/structures/structures.ts";
import { PresenceUpdatePayload } from "../types/mod.ts";
import { Collection } from "./collection.ts";

export interface CacheData {
  isReady: boolean;
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  members: Collection<string, Member>;
  unavailableGuilds: Collection<string, number>;
  presences: Collection<string, PresenceUpdatePayload>;
  // TODO: The type Collection's second provided generic [function] should have a definite shape.
  // deno-lint-ignore ban-types
  fetchAllMembersProcessingRequests: Collection<string, Function>;
  executedSlashCommands: Collection<string, string>;
}

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
