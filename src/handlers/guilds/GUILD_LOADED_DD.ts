import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { Guild } from "../../types/guilds/guild.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleGuildLoaded(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as SnakeCasedPropertiesDeep<Guild>;

  const guild = bot.transformers.guild(bot, { guild: payload, shardId });
  bot.events.guildLoaded(bot, guild);
}
