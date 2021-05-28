import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { GuildEmojisUpdate } from "../../types/emojis/guild_emojis_update.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";
import { Collection } from "../../util/collection.ts";

export async function handleGuildEmojisUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as GuildEmojisUpdate;
  const guild = await cacheHandlers.get("guilds", snowflakeToBigint(payload.guildId));
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = new Collection(payload.emojis.map((emoji) => [snowflakeToBigint(emoji.id!), emoji]));

  await cacheHandlers.set("guilds", guild.id, guild);

  eventHandlers.guildEmojisUpdate?.(guild, guild.emojis, cachedEmojis);
}
