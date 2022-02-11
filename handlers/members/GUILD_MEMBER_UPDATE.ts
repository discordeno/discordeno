import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { GuildMemberUpdate } from "../../types/members/guildMemberUpdate.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildMemberUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMemberUpdate>;

  const user = bot.transformers.user(bot, payload.user);
  bot.events.guildMemberUpdate(
    bot,
    bot.transformers.member(bot, payload, bot.transformers.snowflake(payload.guild_id), user.id),
    user,
  );
}
