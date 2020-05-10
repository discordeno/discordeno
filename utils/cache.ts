import { User } from "../structures/user.ts";
import { Message } from "../structures/message.ts";
import { Guild } from "../structures/guild.ts";
import { Channel } from "../structures/channel.ts";

export interface CacheData {
  guilds: Map<string, Guild>;
  users: Map<string, User>;
  channels: Map<string, Channel>;
  messages: Map<string, Message>;
  unavailableGuilds: Map<string, number>;
}

export const cache: CacheData = {
  guilds: new Map(),
  users: new Map(),
  channels: new Map(),
  messages: new Map(),
  unavailableGuilds: new Map(),
};
