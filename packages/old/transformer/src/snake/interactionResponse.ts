import type { Camelize, DiscordInteractionResponse } from '@discordeno/types'
import { s1nakelize1AllowedMentions } from './allowedMentions.js'
import { s1nakelize1ApplicationCommandOptionChoice } from './applicationCommandOptionChoice.js'
import { s1nakelize1Component } from './component.js'
import { s1nakelize1Embed } from './embed.js'

export function s1nakelize1InteractionResponse (
  payload: Camelize<DiscordInteractionResponse>
): DiscordInteractionResponse {
  // If no mentions are provided, force disable mentions
  if (payload.data && !payload.data?.allowedMentions) {
    payload.data.allowedMentions = { parse: [] }
  }

  return {
    type: payload.type,
    data: payload.data && {
      tts: payload.data.tts,
      title: payload.data.title,
      flags: payload.data.flags,
      content: payload.data.content,
      choices: payload.data.choices?.map((choice) =>
        s1nakelize1ApplicationCommandOptionChoice(choice)
      ),
      custom_id: payload.data.customId,
      embeds: payload.data.embeds?.map((embed) => s1nakelize1Embed(embed)),
      allowed_mentions: s1nakelize1AllowedMentions(
        payload.data.allowedMentions!
      ),
      components: payload.data.components?.map((component) =>
        s1nakelize1Component(component)
      )
    }
  }
}
