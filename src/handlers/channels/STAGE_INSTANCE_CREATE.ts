import { eventHandlers } from "../../bot.ts";
import { cacheHandlers } from "../../cache.ts";
import type { StageInstance } from "../../types/channels/stage_instance.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleStageInstanceCreate(data: DiscordGatewayPayload) {
  const { channelId, guildId, ...rest } = data.d as StageInstance;

  const cachedGuild = await cacheHandlers.get(
    "guilds",
    snowflakeToBigint(guildId),
  );
  if (!cachedGuild) return;
  const cachedChannel = await cacheHandlers.get(
    "channels",
    snowflakeToBigint(channelId),
  );
  if (!cachedChannel) return;

  eventHandlers.stageInstanceCreate?.({
    ...rest,
    channel: cachedChannel,
    guild: cachedGuild,
  });
}
