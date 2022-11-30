import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuildMemberRemove } from "../../types/discord.ts";

export async function handleGuildMemberRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildMemberRemove;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const user = bot.transformers.user(bot, payload.user);

  bot.events.guildMemberRemove(bot, user, guildId);
}
