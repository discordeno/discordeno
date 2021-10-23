import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { Guild } from "../../types/guilds/guild.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<Guild>;
  
  const guild = bot.transformers.guild(bot, { guild: payload, shardId });
  const cached = await bot.cache.guilds.get(guild.id);
  await bot.cache.guilds.set(guild.id, guild);
  
  bot.events.guildUpdate(bot, guild, cached);
}
