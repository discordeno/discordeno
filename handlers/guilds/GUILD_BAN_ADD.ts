import type { Bot } from "../../bot.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import type { GuildBanAddRemove } from "../../types/guilds/guildBanAddRemove.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";

export async function handleGuildBanAdd(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildBanAddRemove>;
  bot.events.guildBanAdd(bot, bot.transformers.user(bot, payload.user), bot.transformers.snowflake(payload.guild_id));
}
