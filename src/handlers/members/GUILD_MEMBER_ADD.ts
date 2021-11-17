import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { GuildMemberAdd } from "../../types/members/guildMemberAdd.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildMemberAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMemberAdd>;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const user = bot.transformers.user(bot, payload.user);
  const member = bot.transformers.member(bot, payload, guildId, user.id);

  await Promise.all([
    bot.cache.members.set(member.id, member),
    bot.cache.users.set(user.id, user),
    bot.cache.execute("GUILD_MEMBER_COUNT_INCREMENT", { guildId }),
  ]);

  bot.events.guildMemberAdd(bot, member, user);
}
