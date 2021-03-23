import { eventHandlers } from "../../bot.ts";

export function handleWebhooksUpdate(data: DiscordPayload) {
  const options = data.d as WebhookUpdatePayload;
  eventHandlers.webhooksUpdate?.(
    options.channel_id,
    options.guild_id,
  );
}
