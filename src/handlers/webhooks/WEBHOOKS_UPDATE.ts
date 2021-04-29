import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { WebhookUpdate } from "../../types/webhooks/webhooks_update.ts";

export function handleWebhooksUpdate(data: DiscordGatewayPayload) {
  const options = data.d as WebhookUpdate;
  eventHandlers.webhooksUpdate?.(
    options.channelId,
    options.guildId,
  );
}
