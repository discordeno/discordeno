import { eventHandlers } from "../../bot.ts";
import {
  DiscordGatewayPayload,
  DiscordWebhooksUpdate,
} from "../../types/gateway.ts";

export function handleWebhooksUpdate(data: DiscordGatewayPayload) {
  const options = data.d as DiscordWebhooksUpdate;
  eventHandlers.webhooksUpdate?.(
    options.channel_id,
    options.guild_id,
  );
}
