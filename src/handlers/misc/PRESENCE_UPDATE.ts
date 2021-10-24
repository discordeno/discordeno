import { Bot } from "../../bot.ts";
import type { PresenceUpdate } from "../../types/activity/presence_update.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handlePresenceUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<PresenceUpdate>;

  const id = bot.transformers.snowflake(payload.user.id);

  const oldPresence = await bot.cache.presence.get(id);
  const presence = bot.transformers.presence(bot, payload);
  await bot.cache.presence.set(id, presence)

  
 bot.events.presenceUpdate(bot, presence, oldPresence);
}
