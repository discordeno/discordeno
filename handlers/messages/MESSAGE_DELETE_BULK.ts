import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordMessageDeleteBulk } from "../../types/discord.ts";

export async function handleMessageDeleteBulk(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordMessageDeleteBulk;

  const channelId = bot.transformers.snowflake(payload.channel_id);
  const guildId = payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined;

  payload.ids.forEach((id) =>
    bot.events.messageDelete(bot, {
      id: bot.transformers.snowflake(id),
      channelId,
      guildId,
    })
  );
}
