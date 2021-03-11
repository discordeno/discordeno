import { eventHandlers } from "../../bot.ts";
import { DiscordPayload, GuildEmojisUpdatePayload } from "../../types/mod.ts";
import { Collection } from "../../util/collection.ts";
import { cacheHandlers } from "./cache.ts";

export async function handleGuildEmojisUpdate(data: DiscordPayload) {
  const payload = data.d as GuildEmojisUpdatePayload;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = new Collection(
    payload.emojis.map((emoji) => [emoji.id ?? emoji.name, emoji]),
  );

  cacheHandlers.set("guilds", payload.guild_id, guild);

  eventHandlers.guildEmojisUpdate?.(
    guild,
    guild.emojis,
    cachedEmojis,
  );
}
