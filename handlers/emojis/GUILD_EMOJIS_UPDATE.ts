import type { Bot } from "../../bot.ts";
import type { GuildEmojisUpdate } from "../../types/emojis/guildEmojisUpdate.ts";
import type { DiscordGatewayPayload } from "../../types/gateway/gatewayPayload.ts";
import { SnakeCasedPropertiesDeep } from "../../types/util.ts";
import { Collection } from "../../util/collection.ts";

export async function handleGuildEmojisUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as SnakeCasedPropertiesDeep<GuildEmojisUpdate>;

  bot.events.guildEmojisUpdate(bot, {
    guildId: bot.transformers.snowflake(payload.guild_id),
    emojis: new Collection(payload.emojis.map((emoji) => [bot.transformers.snowflake(emoji.id!), emoji])),
  });
}
