import { eventHandlers } from "../../bot.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { DiscordWebhooksUpdate } from "../../types/webhooks/webhooks_update.ts";

export function handleWebhooksUpdate(data: DiscordGatewayPayload) {
  const options = data.d as DiscordWebhooksUpdate;
  eventHandlers.webhooksUpdate?.(
    options.channel_id,
    options.guild_id,
  );
}
