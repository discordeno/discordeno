import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { UnavailableGuild } from "../../types/guilds/unavailable_guild.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<UnavailableGuild>;

  const id = bot.transformers.snowflake(payload.id);
  const guild = await bot.cache.guilds.get(id);
  await bot.events.guildDelete(bot, id, guild);
  if (!guild) return;
  
  await bot.cache.guilds.delete(id);


  await Promise.all([
    bot.cache.forEach("DELETE_MESSAGES_FROM_GUILD", { guildId: guild.id }),
    bot.cache.forEach("DELETE_CHANNELS_FROM_GUILD", { guildId: guild.id }),
    bot.cache.forEach("DELETE_GUILD_FROM_MEMBER", { guildId: guild.id }),
  ]);
}
