import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { Guild } from "../../types/guilds/guild.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleGuildCreate(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<Guild>;
  bot.events.guildCreate(bot, bot.transformers.guild(bot, { guild: payload, shardId }));
}
