import { Bot } from '../../../bot.js'
import { AutoModerationRule } from '../../../transformers/automodRule.js'
import { DiscordAutoModerationRule } from '../../../types/discord.js'
import { BigString } from '../../../types/shared.js'
import { Collection } from '../../../util/collection.js'

/**
 * Gets the list of automod rules for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the rules from.
 * @returns A collection of {@link AutoModerationRule} objects assorted by rule ID.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild}
 */
export async function getAutomodRules (bot: Bot, guildId: BigString): Promise<Collection<bigint, AutoModerationRule>> {
  const results = await bot.rest.runMethod<DiscordAutoModerationRule[]>(
    bot.rest,
    'GET',
    bot.constants.routes.AUTOMOD_RULES(guildId)
  )

  return new Collection(
    results.map((result) => {
      const rule = bot.transformers.automodRule(bot, result)
      return [rule.id, rule]
    })
  )
}
