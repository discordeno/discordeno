import type { BigString, DiscordUser } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { User } from '../../transformers/member.js'

/** This function will return the raw user payload in the rare cases you need to fetch a user directly from the API. */
export async function getUser (
  rest: RestManager,
  userId: BigString
): Promise<User> {
  const result = await rest.runMethod<DiscordUser>(
    rest,
    'GET',
    rest.constants.routes.USER(userId)
  )

  return rest.transformers.user(rest, result)
}
