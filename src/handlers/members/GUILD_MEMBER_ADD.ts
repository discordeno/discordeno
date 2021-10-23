import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildMemberAdd } from "../../types/members/guild_member_add.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildMemberAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMemberAdd>;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const member = bot.transformers.member(bot, payload, guildId);
  const user = bot.transformers.user(bot, payload.user);

  await Promise.all([
    bot.cache.members.set(member.id, member),
    bot.cache.users.set(user.id, user),
    bot.cache.execute("GUILD_MEMBER_COUNT_INCREMENT", { guildId }),
  ]);

  bot.events.guildMemberAdd(bot, member, user);
}
