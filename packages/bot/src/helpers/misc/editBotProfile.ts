import { DiscordUser } from '@discordeno/types'
import type { Bot } from '../../bot.js'
import { User } from '../../transformers/member.js'

/**
 * Modifies the bot's username or avatar.
 * NOTE: username: if changed may cause the bot's discriminator to be randomized.
 */
export async function editBotProfile (
  bot: Bot,
  options: { username?: string, botAvatarURL?: string | null }
): Promise<User> {
  const avatar = options?.botAvatarURL ? await bot.utils.urlToBase64(options?.botAvatarURL) : options?.botAvatarURL

  const result = await bot.rest.runMethod<DiscordUser>(bot.rest, 'PATCH', bot.constants.routes.USER_BOT(), {
    username: options.username?.trim(),
    avatar
  })

  return bot.transformers.user(bot, result)
}