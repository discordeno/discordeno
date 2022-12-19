import { routes } from '@discordeno/constant'
import type { BigString, DiscordMessage } from '@discordeno/types'
import { InteractionResponseTypes } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import type { Message } from '../../../transformers/message.js'
import type { InteractionCallbackData } from '../../../types.js'

/**
 * Edits a follow-up message to an interaction.
 *
 * @param rest - The rest manager to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 * @param messageId - The ID of the message to edit.
 * @param options - The parameters for the edit of the message.
 * @returns An instance of the edited {@link Message}.
 *
 * @remarks
 * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * Fires a _Message Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-followup-message}
 */
export async function editFollowupMessage (
  rest: RestManager,
  token: string,
  messageId: BigString,
  options: InteractionCallbackData
): Promise<Message> {
  const result = await rest.runMethod<DiscordMessage>(
    rest,
    'PATCH',
    routes.WEBHOOK_MESSAGE(rest.applicationId, token, messageId),
    {
      messageId: messageId.toString(),
      ...rest.transformers.reverse.interactionResponse(rest, {
        type: InteractionResponseTypes.UpdateMessage,
        data: options
      }).data,
      file: options.file
    }
  )

  return rest.transformers.message(rest, result)
}
