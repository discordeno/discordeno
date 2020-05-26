import Collection from "./collection.ts";
import { Message } from "../structures/message.ts";
import { Guild } from "../structures/guild.ts";
import { Channel } from "../structures/channel.ts";

export interface CacheData {
  guilds: Collection<string, Guild>;
  channels: Collection<string, Channel>;
  messages: Collection<string, Message>;
  unavailableGuilds: Collection<string, number>;
}

export const cache: CacheData = {
  guilds: new Collection(),
  channels: new Collection(),
  messages: new Collection(),
  unavailableGuilds: new Collection(),
};
