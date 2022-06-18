import { Bot } from "../../../bot.ts";
import { DiscordAutoModerationRule } from "../../../deps.ts";
import { BotCollection as Collection } from "../../../util/collection.ts";

/** Get a rule currently configured for guild. */
export async function getAutomodRule(bot: Bot, guildId: bigint, ruleId: bigint) {
  const rule = await bot.rest.runMethod<DiscordAutoModerationRule>(
    bot.rest,
    "GET",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
  );

  return bot.transformers.automodRule(bot, rule);
}
