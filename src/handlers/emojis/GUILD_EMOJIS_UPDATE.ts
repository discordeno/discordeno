import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { Collection } from "../../util/collection.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordGuildEmojisUpdate } from "../../types/emojis/guild_emojis_update.ts";

export async function handleGuildEmojisUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildEmojisUpdate;
  const guild = await cacheHandlers.get("guilds", payload.guild_id);
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = new Collection(
    payload.emojis.map((emoji) => [emoji.id ?? emoji.name, emoji]),
  );

  await cacheHandlers.set("guilds", payload.guild_id, guild);

  eventHandlers.guildEmojisUpdate?.(
    guild,
    guild.emojis,
    cachedEmojis,
  );
}
