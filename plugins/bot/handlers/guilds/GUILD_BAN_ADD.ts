import { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuildBanAddRemove } from "../../deps.ts";

export async function handleGuildBanAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildBanAddRemove;
  bot.events.guildBanAdd(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id));
}
