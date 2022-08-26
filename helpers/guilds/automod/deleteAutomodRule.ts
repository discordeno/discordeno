import { Bot } from "../../../bot.ts";

/** Delete a rule currently configured for guild. */
export async function deleteAutomodRule(bot: Bot, guildId: bigint, ruleId: bigint, reason?: string): Promise<void> {
  return void await bot.rest.runMethod(
    bot.rest,
    "DELETE",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
    { reason },
  );
}
