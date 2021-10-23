import { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildMemberRemove } from "../../types/members/guild_member_remove.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import { snowflakeToBigint } from "../../util/bigint.ts";

export async function handleGuildMemberRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildMemberRemove>;
  const guildId = bot.transformers.snowflake(payload.guild_id);
  const user = bot.transformers.user(bot, payload.user);

  await Promise.all([
    bot.cache.members.delete(user.id),
    bot.cache.execute("GUILD_MEMBER_COUNT_DECREMENT", { guildId }),
  ]);

  bot.events.guildMemberRemove(bot, user, guildId);
}
