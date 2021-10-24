import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { User } from "../../types/users/user.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleUserUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<User>;
  const user = bot.transformers.user(bot, payload);
  await bot.cache.users.set(user.id, user);

  bot.events.botUpdate(bot, user);
}
