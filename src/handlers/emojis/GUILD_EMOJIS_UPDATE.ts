import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { GuildEmojisUpdate } from "../../types/emojis/guild_emojis_update.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { Collection } from "../../util/collection.ts";

export async function handleGuildEmojisUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as GuildEmojisUpdate;
  const guild = await cacheHandlers.get("guilds", payload.guildId);
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = new Collection(
    payload.emojis.map((emoji) => [emoji.id!, emoji]),
  );

  await cacheHandlers.set("guilds", payload.guildId, guild);

  eventHandlers.guildEmojisUpdate?.(
    guild,
    guild.emojis,
    cachedEmojis,
  );
}
