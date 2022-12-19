import { routes } from '@discordeno/constant'
import type { BigString, DiscordUser, GetReactions } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../../restManager.js'
import type { User } from '../../../transformers/member.js'

/** Get a list of users that reacted with this emoji. */
/**
 * Gets the list of users that reacted with an emoji to a message.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel the message to get the users for is in.
 * @param messageId - The ID of the message to get the users for.
 * @param reaction - The reaction for which to get the users.
 * @param options - The parameters for the fetching of the users.
 * @returns A collection of {@link User} objects assorted by user ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-reactions}
 */
export async function getReactions (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString,
  reaction: string,
  options?: GetReactions
): Promise<Collection<bigint, User>> {
  reaction = processReactionString(reaction)

  const results = await rest.runMethod<DiscordUser[]>(
    rest,
    'GET',
    routes.CHANNEL_MESSAGE_REACTION(
      channelId,
      messageId,
      reaction,
      options
    )
  )

  return new Collection(
    results.map((result) => {
      const user = rest.transformers.user(rest, result)
      return [user.id, user]
    })
  )
}

export function processReactionString (reaction: string): string {
  if (reaction.startsWith('<:')) {
    return reaction.substring(2, reaction.length - 1)
  }

  if (reaction.startsWith('<a:')) {
    return reaction.substring(3, reaction.length - 1)
  }

  return reaction
}
