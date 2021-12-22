import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { GuildMemberRemove } from "../../types/members/guildMemberRemove.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildMemberRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMemberRemove>;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const user = bot.transformers.user(bot, payload.user);

  bot.events.guildMemberRemove(bot, user, guildId);
}
