import { Bot } from "../../../bot.ts";

/** Delete a rule currently configured for guild. */
export async function deleteAutomodRule(bot: Bot, guildId: bigint, ruleId: bigint) {
  await bot.rest.runMethod<undefined>(
    bot.rest,
    "DELETE",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
  );
}
