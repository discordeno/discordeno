import type { Bot } from "../../../bot.ts";
import { VoiceRegions } from "../../../transformers/voiceRegion.ts";
import { DiscordVoiceRegion } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Returns a list of voice region objects for the guild. Unlike the similar /voice route, this returns VIP servers when the guild is VIP-enabled. */
export async function getVoiceRegions(bot: Bot, guildId: bigint): Promise<Collection<string, VoiceRegions>> {
  const results = await bot.rest.runMethod<DiscordVoiceRegion[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_REGIONS(guildId),
  );

  return new Collection(
    results.map((result) => {
      const region = bot.transformers.voiceRegion(bot, result);
      return [region.id, region];
    }),
  );
}
