import { BigString, DiscordBan } from '@discordeno/types'
import type { Bot } from '../../bot.js'
import { User } from '../../transformers/member.js'

export interface Ban {
  reason?: string
  user: User
}

// TODO: Move `Ban` into its own transformer file.

/**
 * Gets a ban by user ID.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the ban from.
 * @param userId - The ID of the user to get the ban for.
 * @returns An instance of {@link Ban}.
 *
 * @remarks
 * Requires the `BAN_MEMBERS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#get-guild-ban}
 */
export async function getBan (bot: Bot, guildId: BigString, userId: BigString): Promise<Ban> {
  const result = await bot.rest.runMethod<DiscordBan>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_BAN(guildId, userId)
  )

  return {
    reason: result.reason ?? undefined,
    user: bot.transformers.user(bot, result.user)
  }
}
