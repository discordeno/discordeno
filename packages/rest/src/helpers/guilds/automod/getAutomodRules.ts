import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordAutoModerationRule
} from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'

/**
 * Gets the list of automod rules for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the rules from.
 * @returns A collection of {@link DiscordAutoModerationRule} objects assorted by rule ID.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/auto-moderation#list-auto-moderation-rules-for-guild}
 */
export async function getAutomodRules (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Camelize<DiscordAutoModerationRule>>> {
  const results = await rest.runMethod<DiscordAutoModerationRule[]>(
    'GET',
    routes.AUTOMOD_RULES(guildId)
  )

  return new Collection(
    results.map((result) => {
      const rule = TRANSFORMERS.automodRule(result)
      return [rule.id, rule]
    })
  )
}
