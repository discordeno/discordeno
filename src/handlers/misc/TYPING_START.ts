import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { TypingStart } from "../../types/misc/typing_start.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleTypingStart(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<TypingStart>;
  
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;

  bot.events.typingStart(bot, {
    guildId,
    channelId: bot.transformers.snowflake(payload.channel_id),
    userId: bot.transformers.snowflake(payload.user_id),
    timestamp: payload.timestamp,
    member: payload.member && guildId ? bot.transformers.member(bot, payload.member, guildId) : undefined,
  });
}
