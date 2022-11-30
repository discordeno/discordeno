import { Bot } from "../../../bot.ts";
import { BigString } from "../../../types/shared.ts";

/**
 * Deletes an automod rule.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to delete the rule from.
 * @param ruleId - The ID of the automod rule to delete.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires an _Auto Moderation Rule Delete_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule}
 */
export async function deleteAutomodRule(
  bot: Bot,
  guildId: BigString,
  ruleId: BigString,
  reason?: string,
): Promise<void> {
  return await bot.rest.runMethod<void>(
    bot.rest,
    "DELETE",
    bot.constants.routes.AUTOMOD_RULE(guildId, ruleId),
    { reason },
  );
}
