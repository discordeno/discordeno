import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildBanAddRemove } from "../../types/guilds/guild_ban_add_remove.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildBanAdd(bot: Bot, data: SnakeCasedPropertiesDeep<DiscordGatewayPayload>) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildBanAddRemove>;
  // FIRST COMPLETE THE END USERS EVENT
  await bot.events.guildBanAdd(
    bot,
    bot.transformers.user(bot, payload.user),
    bot.transformers.snowflake(payload.guild_id)
  );
  // THEN DELETE THE MEMBER
  await bot.cache.members.delete(bot.transformers.snowflake(payload.user.id));
}
