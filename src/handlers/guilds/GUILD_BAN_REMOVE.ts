import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gateway_payload.ts";
import type { GuildBanAddRemove } from "../../types/guilds/guild_ban_add_remove.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildBanRemove(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildBanAddRemove>;

  await bot.events.guildBanRemove(
    bot,
    bot.transformers.user(bot, payload.user),
    bot.transformers.snowflake(payload.guild_id)
  );
}
