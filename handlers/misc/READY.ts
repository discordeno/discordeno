import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { DiscordReady } from "../../types/gateway/ready.ts";

export function handleReady(bot: Bot, data: DiscordGatewayPayload, shardId: number) {
  const payload = data.d as DiscordReady;
  // Triggered on each shard
  bot.events.ready(
    bot,
    {
      shardId,
      v: payload.v,
      user: bot.transformers.user(bot, payload.user),
      guilds: payload.guilds.map((p) => bot.transformers.snowflake(p.id)),
      sessionId: payload.session_id,
      shard: payload.shard,
      applicationId: bot.transformers.snowflake(payload.application.id),
    },
    payload,
  );

  if (!bot.id) bot.id = bot.transformers.snowflake(payload.user.id);
  if (!bot.applicationId) bot.applicationId = bot.transformers.snowflake(payload.application.id);
}
