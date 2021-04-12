import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordWebhookUpdate } from "../../types/webhooks/webhooks_update.ts";

export function handleWebhooksUpdate(data: DiscordGatewayPayload) {
  const options = data.d as DiscordWebhookUpdate;
  eventHandlers.webhooksUpdate?.(
    options.channel_id,
    options.guild_id,
  );
}
