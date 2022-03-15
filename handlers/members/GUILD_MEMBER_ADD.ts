import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuildMemberAdd } from "../../types/discord.ts";

export async function handleGuildMemberAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildMemberAdd;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const user = bot.transformers.user(bot, payload.user);
  const member = bot.transformers.member(bot, payload, guildId, user.id);
  bot.events.guildMemberAdd(bot, member, user);
}
