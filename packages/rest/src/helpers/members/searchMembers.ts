import type {
  DiscordMemberWithUser,
  SearchMembers,
  BigString
} from '@discordeno/types'

import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Member } from '../../transformers/member.js'

/**
 * Gets the list of members whose usernames or nicknames start with a provided string.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to search in.
 * @param query - The string to match usernames or nicknames against.
 * @param options - The parameters for searching through the members.
 * @returns A collection of {@link Member} objects assorted by user ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#search-guild-members}
 */
export async function searchMembers (
  rest: RestManager,
  guildId: BigString,
  query: string,
  options?: Omit<SearchMembers, 'query'>
): Promise<Collection<bigint, Member>> {
  if (options?.limit) {
    if (options.limit < 1) {
      throw new Error(rest.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_LOW)
    }
    if (options.limit > 1000) {
      throw new Error(rest.constants.Errors.MEMBER_SEARCH_LIMIT_TOO_HIGH)
    }
  }

  const results = await rest.runMethod<DiscordMemberWithUser[]>(
    rest,
    'GET',
    rest.constants.routes.GUILD_MEMBERS_SEARCH(guildId, query, options)
  )

  const id = rest.transformers.snowflake(guildId)

  return new Collection(
    results.map((result) => {
      const member = rest.transformers.member(
        rest,
        result,
        id,
        rest.transformers.snowflake(result.user.id)
      )
      return [member.id, member]
    })
  )
}
