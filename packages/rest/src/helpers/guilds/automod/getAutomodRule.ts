import { BigString, DiscordAutoModerationRule } from '@discordeno/types'
import { RestManager } from '../../../restManager.js'
import { AutoModerationRule } from '../../../transformers/automodRule.js'

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
export async function getAutomodRule (
  rest: RestManager,
  guildId: BigString,
  ruleId: BigString
): Promise<AutoModerationRule> {
  const result = await rest.runMethod<DiscordAutoModerationRule>(
    rest,
    'GET',
    rest.constants.routes.AUTOMOD_RULE(guildId, ruleId)
  )

  return rest.transformers.automodRule(rest, result)
}
