import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { WebhookUpdate } from "../../types/webhooks/webhooks_update.ts";
import { Bot } from "../../bot.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export function handleWebhooksUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<WebhookUpdate>;
  bot.events.webhooksUpdate(bot, {
    channelId: bot.transformers.snowflake(payload.channel_id),
    guildId: bot.transformers.snowflake(payload.guild_id),
  });
}
