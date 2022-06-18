import { BotCollection as Collection } from "../../util/collection.ts";
import { Bot } from "../../bot.ts";
import { DiscordChannel } from "../../deps.ts";

/** Returns a list of guild channel objects. */
export async function getChannels(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordChannel[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_CHANNELS(guildId),
  );

  return new Collection(
    result.map((res) => bot.transformers.channel(bot, { channel: res, guildId })).map((c) => [c.id, c]),
  );
}
