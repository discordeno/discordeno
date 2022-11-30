import type { Bot } from '../../bot.js'
import { Webhook } from '../../transformers/webhook.js'
import { DiscordWebhook } from '../../types/discord.js'
import { BigString } from '../../types/shared.js'
import { Collection } from '../../util/collection.js'

/**
 * Gets a list of webhooks for a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel which to get the webhooks of.
 * @returns A collection of {@link Webhook} objects assorted by webhook ID.
 *
 * @remarks
 * Requires the `MANAGE_WEBHOOKS` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-channel-webhooks}
 */
export async function getChannelWebhooks (bot: Bot, channelId: BigString): Promise<Collection<bigint, Webhook>> {
  const results = await bot.rest.runMethod<DiscordWebhook[]>(
    bot.rest,
    'GET',
    bot.constants.routes.CHANNEL_WEBHOOKS(channelId)
  )

  return new Collection(
    results.map((result) => {
      const webhook = bot.transformers.webhook(bot, result)
      return [webhook.id, webhook]
    })
  )
}
