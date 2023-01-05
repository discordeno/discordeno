import type { DiscordInteractionResponse } from '@discordeno/types'
import type { Client } from '../../client.js'
import type { InteractionResponse } from '../../types'

export function transformInteractionResponseToDiscordInteractionResponse (
  client: Client,
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
            client.transformers.reverse.applicationCommandOptionChoice(
              client,
              choice
            )
          ),
          custom_id: payload.data.customId,
          embeds: payload.data.embeds?.map((embed) =>
            client.transformers.reverse.embed(client, embed)
          ),
          allowed_mentions: client.transformers.reverse.allowedMentions(
            client,
            payload.data.allowedMentions
          ),
          components: payload.data.components?.map((component) =>
            client.transformers.reverse.component(client, component)
          )
        }
      : undefined
  }
}
