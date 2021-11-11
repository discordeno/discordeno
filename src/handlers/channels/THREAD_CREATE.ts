import { Bot } from "../../bot.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleThreadCreate(bot:  Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Channel>;

  // bot.events.threadCreate(bot, payload);
}
