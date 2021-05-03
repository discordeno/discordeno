import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { PresenceUpdate } from "../../types/misc/presence_update.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handlePresenceUpdate(data: DiscordGatewayPayload) {
  const payload = data.d as PresenceUpdate;

  const oldPresence = await cacheHandlers.get(
    "presences",
    snowflakeToBigint(payload.user.id),
  );
  await cacheHandlers.set(
    "presences",
    snowflakeToBigint(payload.user.id),
    payload,
  );

  eventHandlers.presenceUpdate?.(payload, oldPresence);
}
