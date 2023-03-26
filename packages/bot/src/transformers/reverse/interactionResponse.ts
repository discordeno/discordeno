import type { Bot } from '../../index.js'
import type { BotInteractionResponse, DiscordInteractionResponse } from '../../typings.js'

export function transformInteractionResponseToDiscordInteractionResponse(bot: Bot, payload: BotInteractionResponse): DiscordInteractionResponse {
  // If no mentions are provided, force disable mentions
  if (payload.data && !payload.data?.allowedMentions) {
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
          choices: payload.data.choices?.map((choice) => bot.transformers.reverse.applicationCommandOptionChoice(bot, choice)),
          custom_id: payload.data.customId,
          embeds: payload.data.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
          allowed_mentions: bot.transformers.reverse.allowedMentions(bot, payload.data.allowedMentions!),
          components: payload.data.components?.map((component) => bot.transformers.reverse.component(bot, component)),
        }
      : undefined,
  }
}
