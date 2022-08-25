import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordReady } from "../../types/discord.ts";

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

  bot.id = bot.transformers.snowflake(payload.user.id);
  bot.applicationId = bot.transformers.snowflake(payload.application.id);
}
