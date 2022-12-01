import { BigString, DiscordWebhook } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { Bot } from '../../bot.js'
import { Webhook } from '../../transformers/webhook.js'

/**
 * Gets the list of webhooks for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the list of webhooks for.
 * @returns A collection of {@link Webhook} objects assorted by webhook ID.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-guild-webhooks}
 */
export async function getGuildWebhooks (bot: Bot, guildId: BigString): Promise<Collection<bigint, Webhook>> {
  const results = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_WEBHOOKS(guildId)
  )

  return new Collection(
    results.map((result) => {
      const webhook = bot.transformers.webhook(bot, result)
      return [webhook.id, webhook]
    })
  )
}
