import { DiscordInteractionResponse } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import { InteractionResponse } from '../../types'

export function transformInteractionResponseToDiscordInteractionResponse (
  rest: RestManager,
  payload: InteractionResponse
): DiscordInteractionResponse {
  // If no mentions are provided, force disable mentions
  if (payload.data && payload.data?.allowedMentions == null) {
    payload.data.allowedMentions = { parse: [] }
  }

  return {
    type: payload.type,
    data: payload.data
      ? {
          tts: payload.data.tts,
          title: payload.data.title,
          flags: payload.data.flags,
          content: payload.data.content,
          choices: payload.data.choices?.map((choice) =>
            rest.transformers.reverse.applicationCommandOptionChoice(
              rest,
              choice
            )
          ),
          custom_id: payload.data.customId,
          embeds: payload.data.embeds?.map((embed) =>
            rest.transformers.reverse.embed(rest, embed)
          ),
          allowed_mentions: rest.transformers.reverse.allowedMentions(
            rest,
            payload.data.allowedMentions!
          ),
          components: payload.data.components?.map((component) =>
            rest.transformers.reverse.component(rest, component)
          )
        }
      : undefined
  }
}
