import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordWebhookUpdate } from "../../deps.ts";

export function handleWebhooksUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordWebhookUpdate;
  bot.events.webhooksUpdate(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
