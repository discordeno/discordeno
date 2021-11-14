import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { UnavailableGuild } from "../../types/guilds/unavailableGuild.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildDelete(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<UnavailableGuild>;
  bot.events.guildDelete(bot, bot.transformers.snowflake(payload.id), shardId);
}
