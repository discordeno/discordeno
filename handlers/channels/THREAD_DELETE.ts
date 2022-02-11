import { Bot } from "../../bot.ts";
import { Channel } from "../../types/channels/channel.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleThreadDelete(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<Channel>;
  bot.events.threadDelete(bot, bot.transformers.channel(bot, { channel: payload }));
}
