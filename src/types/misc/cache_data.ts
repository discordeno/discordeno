import { Collection } from "../../util/collection.ts";
import { PresenceUpdate } from "./presence_update.ts";

export interface CacheData {
  isReady: boolean;
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  members: Collection<string, Member>;
  unavailableGuilds: Collection<string, number>;
  presences: Collection<string, PresenceUpdate>;
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
