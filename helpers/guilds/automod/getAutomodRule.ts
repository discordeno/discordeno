import { Bot } from "../../../bot.ts";
import { AutoModerationRule } from "../../../transformers/automodRule.ts";
import { DiscordAutoModerationRule } from "../../../types/discord.ts";

/** Get a rule currently configured for guild. */
export async function getAutomodRule(bot: Bot, guildId: bigint, ruleId: bigint): Promise<AutoModerationRule> {
  const result = await bot.rest.runMethod<DiscordAutoModerationRule>(
    bot.rest,
    "GET",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
  );

  return bot.transformers.automodRule(bot, result);
}
