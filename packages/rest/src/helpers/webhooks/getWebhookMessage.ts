import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { BigString, Camelize, DiscordMessage } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'

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
 * @returns An instance of {@link DiscordMessage}.
 *
 * @see {@link https://discord.com/developers/docs/resources/webhook#get-webhook-message}
 */
export async function getWebhookMessage (
  rest: RestManager,
  webhookId: BigString,
  token: string,
  messageId: BigString,
  options?: GetWebhookMessageOptions
): Promise<Camelize<DiscordMessage>> {
  const result = await rest.runMethod<DiscordMessage>(
    'GET',
    routes.WEBHOOK_MESSAGE(webhookId, token, messageId, options)
  )

  return TRANSFORMERS.message(result)
}
