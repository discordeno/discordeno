import { Bot } from "../../../bot.ts";
import { AutoModerationRule } from "../../../transformers/automodRule.ts";
import { DiscordAutoModerationRule } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Get a list of all rules currently configured for guild. */
export async function getAutomodRules(bot: Bot, guildId: bigint): Promise<Collection<bigint, AutoModerationRule>> {
  const results = await bot.rest.runMethod<DiscordAutoModerationRule[]>(
    bot.rest,
    "GET",
    bot.constants.routes.AUTOMOD_RULES(guildId),
  );

  return new Collection(
    results.map((result) => {
      const rule = bot.transformers.automodRule(bot, result);
      return [rule.id, rule];
    }),
  );
}
