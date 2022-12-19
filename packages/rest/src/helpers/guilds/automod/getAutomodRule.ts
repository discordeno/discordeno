import { routes } from '@discordeno/constant'
import type { BigString, DiscordAutoModerationRule } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { AutoModerationRule } from '../../../transformers/automodRule.js'

/**
 * Gets an automod rule by its ID.
 *
 * @param rest - The rest manager to use to make the request.
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
    routes.AUTOMOD_RULE(guildId, ruleId)
  )

  return rest.transformers.automodRule(rest, result)
}
