import { routes } from '@discordeno/constant'
import type { DiscordUser } from '@discordeno/types'
import { urlToBase64 } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { User } from '../../transformers/member.js'

/**
 * Modifies the bot's username or avatar.
 * NOTE: username: if changed may cause the bot's discriminator to be randomized.
 */
export async function editBotProfile (
  rest: RestManager,
  options: { username?: string, botAvatarURL?: string | null }
): Promise<User> {
  const avatar = options?.botAvatarURL
    ? await urlToBase64(options?.botAvatarURL)
    : options?.botAvatarURL

  const result = await rest.runMethod<DiscordUser>(
    rest,
    'PATCH',
    routes.USER_BOT(),
    {
      username: options.username?.trim(),
      avatar
    }
  )

  return rest.transformers.user(rest, result)
}
