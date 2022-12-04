import { DiscordMessage, InteractionResponseTypes } from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { Message } from '../../../transformers/message.js'
import { InteractionCallbackData } from '../../../types'

/**
 * Edits the initial message response to an interaction.
 *
 * @param bot - The bot instance to use to make the request.
 * @param token - The interaction token to use, provided in the original interaction.
 * @param options - The parameters for the edit of the response.
 * @returns An instance of the edited {@link Message}.
 *
 * @remarks
 * Unlike `editMessage()`, this endpoint allows the bot user to act without needing to see the channel the message is in.
 *
 * Does not support ephemeral follow-up messages due to these being stateless.
 *
 * Fires a _Message Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response}
 */
export async function editOriginalInteractionResponse (
  rest: RestManager,
  token: string,
  options: InteractionCallbackData
): Promise<Message | undefined> {
  const result = await rest.runMethod<DiscordMessage>(
    rest,
    'PATCH',
    rest.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(
      rest.applicationId,
      token
    ),
    {
      ...rest.transformers.reverse.interactionResponse(rest, {
        type: InteractionResponseTypes.UpdateMessage,
        data: options
      }).data,
      file: options.file
    }
  )

  return rest.transformers.message(rest, result)
}
