import { cache } from "../utils/cache.ts";
import { Guild } from "../structures/guild.ts";

export const handleInternalGuildCreate = (guild: Guild) => {
  cache.guilds.set(guild.id, guild);
};

export const handleInternalGuildUpdate = (guild: Guild) => {
  cache.guilds.set(guild.id, guild);
};

export const handleInternalGuildDelete = (guild: Guild) => {
  cache.guilds.delete(guild.id);
};
