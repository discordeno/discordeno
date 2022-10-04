import { Bot } from "../../../bot.ts";
import { AutoModerationRule } from "../../../transformers/automodRule.ts";
import { DiscordAutoModerationRule } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Gets an automod rule by its ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the rule of.
 * @param ruleId - The ID of the rule to get.
 * @returns An instance of {@link AutoModerationRule}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule}
 */
export async function getAutomodRule(bot: Bot, guildId: BigString, ruleId: BigString): Promise<AutoModerationRule> {
  const result = await bot.rest.runMethod<DiscordAutoModerationRule>(
    bot.rest,
    "GET",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
  );

  return bot.transformers.automodRule(bot, result);
}
