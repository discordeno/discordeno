import type { Bot } from "../../bot.ts";
import { DiscordGatewayPayload, DiscordGuildEmojisUpdate } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

export async function handleGuildEmojisUpdate(bot: Bot, data: DiscordGatewayPayload) {
  const payload = data.d as DiscordGuildEmojisUpdate;

  bot.events.guildEmojisUpdate(bot, {
    guildId: bot.transformers.snowflake(payload.guild_id),
    emojis: new Collection(payload.emojis.map((emoji) => [bot.transformers.snowflake(emoji.id!), emoji])),
  });
}
