import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import { structures } from "../../structures/mod.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { User } from "../../types/users/user.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleUserUpdate(data: DiscordGatewayPayload) {
  const userData = data.d as User;

  const member = await structures.createDiscordenoMember(userData);

  await cacheHandlers.set("members", snowflakeToBigint(userData.id), member);

  eventHandlers.botUpdate?.(userData);
}
