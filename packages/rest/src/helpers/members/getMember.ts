import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type {
  BigString,
  Camelize,
  DiscordMemberWithUser
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

/**
 * Gets the member object by user ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the member object for.
 * @param userId - The ID of the user to get the member object for.
 * @returns An instance of {@link DiscordMemberWithUser}.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-member}
 */
export async function getMember (
  rest: RestManager,
  guildId: BigString,
  userId: BigString
): Promise<Camelize<DiscordMemberWithUser>> {
  const result = await rest.runMethod<DiscordMemberWithUser>(
    'GET',
    routes.GUILD_MEMBER(guildId, userId)
  )

  return TRANSFORMERS.member(result) as Camelize<DiscordMemberWithUser>
}
