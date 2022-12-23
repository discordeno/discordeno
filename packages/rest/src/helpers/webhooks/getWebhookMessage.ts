import { routes } from '@discordeno/constant'
import type { BigString, DiscordMessage } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Message } from '../../transformers/message.js'

export interface GetWebhookMessageOptions {
  threadId: BigString
}

/**
 * Gets a webhook message by its ID.
 *
 * @param rest - The rest manager to use to make the request.
 * @param webhookId - The ID of the webhook to get a message of.
 * @param token - The webhook token, used to get webhook messages.
 * @param messageId - the ID of the webhook message to get.
 * @param options - The parameters for the fetching of the message.
 * @returns An instance of {@link Message}.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
 */
export async function getWebhookMessage (
  rest: RestManager,
  webhookId: BigString,
  token: string,
  messageId: BigString,
  options?: GetWebhookMessageOptions
): Promise<Message> {
  const result = await rest.runMethod<DiscordMessage>(
    'GET',
    routes.WEBHOOK_MESSAGE(webhookId, token, messageId, options)
  )

  return TRANSFORMERS.message(rest, result)
}
