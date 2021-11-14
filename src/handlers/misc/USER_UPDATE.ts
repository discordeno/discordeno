import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { User } from "../../types/users/user.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleUserUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<User>;
  bot.events.botUpdate(bot, bot.transformers.user(bot, payload));
}
