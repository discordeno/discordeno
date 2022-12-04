import { BigString, DiscordMemberWithUser } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { Member } from '../../transformers/member.js'

/**
 * Gets the member object by user ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the member object for.
 * @param userId - The ID of the user to get the member object for.
 * @returns An instance of {@link Member}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member}
 */
export async function getMember (
  rest: RestManager,
  guildId: BigString,
  userId: BigString
): Promise<Member> {
  const result = await rest.runMethod<DiscordMemberWithUser>(
    rest,
    'GET',
    rest.constants.routes.GUILD_MEMBER(guildId, userId)
  )

  return rest.transformers.member(
    rest,
    result,
    rest.transformers.snowflake(guildId),
    rest.transformers.snowflake(userId)
  )
}
