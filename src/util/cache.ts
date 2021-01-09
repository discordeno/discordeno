import { Channel, Guild, Member, Message } from "../api/structures/mod.ts";
import { PresenceUpdateEventPayload } from "../types/mod.ts";
import { Collection } from "./collection.ts";

export interface CacheData {
  isReady: boolean;
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  members: Collection<string, Member>;
  unavailableGuilds: Collection<string, number>;
  presences: Collection<string, PresenceUpdateEventPayload>;
  fetchAllMembersProcessingRequests: Collection<
    string,
    (
      value:
        | Collection<string, Member>
        | PromiseLike<Collection<string, Member>>,
    ) => void
  >;
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
