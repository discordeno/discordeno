import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordMemberWithUser,
  SearchMembers
} from '@discordeno/types'

import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'

/**
 * Gets the list of members whose usernames or nicknames start with a provided string.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to search in.
 * @param query - The string to match usernames or nicknames against.
 * @param options - The parameters for searching through the members.
 * @returns A collection of {@link DiscordMember} objects assorted by user ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#search-guild-members}
 */
export async function searchMembers (
  rest: RestManager,
  guildId: BigString,
  query: string,
  options?: Omit<SearchMembers, 'query'>
): Promise<Collection<string, Camelize<DiscordMemberWithUser>>> {
  const results = await rest.runMethod<DiscordMemberWithUser[]>(
    'GET',
    routes.GUILD_MEMBERS_SEARCH(guildId, query, options)
  )

  return new Collection(
    results.map((result) => {
      const member = TRANSFORMERS.member(
        result
      ) as Camelize<DiscordMemberWithUser>
      return [member.user.id, member]
    })
  )
}
