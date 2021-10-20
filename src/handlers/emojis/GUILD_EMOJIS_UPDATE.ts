import { Bot } from "../../bot.ts";
import type { GuildEmojisUpdate } from "../../types/emojis/guild_emojis_update.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import { Collection } from "../../util/collection.ts";

export async function handleGuildEmojisUpdate(bot: Bot, data: SnakeCasedPropertiesDeep<DiscordGatewayPayload>) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildEmojisUpdate>;
  const guild = await bot.cache.guilds.get(bot.transformers.snowflake(payload.guild_id));
  if (!guild) return;

  const cachedEmojis = guild.emojis;
  guild.emojis = new Collection(payload.emojis.map((emoji) => [bot.transformers.snowflake(emoji.id!), emoji]));

  await bot.cache.guilds.set(guild.id, guild);

  bot.events.guildEmojisUpdate(bot, guild, guild.emojis, cachedEmojis);
}
