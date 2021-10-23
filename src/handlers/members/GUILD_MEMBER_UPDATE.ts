import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildMemberUpdate } from "../../types/members/guild_member_update.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildMemberUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMemberUpdate>;

  // TODO: IDK IF THIS IS BUT IS IT LURKER IN STAGE CHANNEL WHO ISN'T A MEMBER
  if (!payload.joined_at) return;

  bot.events.guildMemberUpdate(
    bot,
    bot.transformers.member(bot, payload, bot.transformers.snowflake(payload.guild_id)),
    bot.transformers.user(bot, payload.user)
  );
}
