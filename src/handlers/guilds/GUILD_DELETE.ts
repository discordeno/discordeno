import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { UnavailableGuild } from "../../types/guilds/unavailable_guild.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<UnavailableGuild>;
  bot.events.guildDelete(bot, bot.transformers.snowflake(payload.id), shardId);
}
