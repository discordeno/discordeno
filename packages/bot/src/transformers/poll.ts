import type { DiscordEmoji, DiscordPoll, DiscordPollMedia } from '@discordeno/types'
import type { Bot } from '../bot.js'
import type { DesiredPropertiesBehavior, SetupDesiredProps, TransformersDesiredProperties } from '../desiredProperties.js'
import { callCustomizer } from '../transformers.js'
import type { Poll, PollMedia, PollResult } from './types.js'

export function transformPoll(bot: Bot, payload: Partial<DiscordPoll>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.poll
  const poll = {} as SetupDesiredProps<Poll, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.question && payload.question) poll.question = bot.transformers.pollMedia(bot, payload.question)
  if (props.answers && payload.answers)
    poll.answers = payload.answers.map((x) => ({ answerId: x.answer_id, pollMedia: bot.transformers.pollMedia(bot, x.poll_media) }))
  if (props.expiry && payload.expiry) poll.expiry = Date.parse(payload.expiry)
  if (props.allowMultiselect && payload.allow_multiselect) poll.allowMultiselect = payload.allow_multiselect
  if (props.layoutType && payload.layout_type !== undefined) poll.layoutType = payload.layout_type
  if (props.results && payload.results) {
    const results = {} as SetupDesiredProps<PollResult, TransformersDesiredProperties, DesiredPropertiesBehavior>
    const pollResultProps = bot.transformers.desiredProperties.pollResult

    if (pollResultProps.isFinalized && payload.results.is_finalized) results.isFinalized = payload.results.is_finalized
    if (pollResultProps.answerCounts && payload.results.answer_counts)
      results.answerCounts = payload.results.answer_counts.map((x) => ({ id: x.id, count: x.count, meVoted: x.me_voted }))

    poll.results = results
  }

  return callCustomizer('poll', bot, payload, poll, {
    partial: extra?.partial ?? false,
  })
}

export function transformPollMedia(bot: Bot, payload: Partial<DiscordPollMedia>, extra?: { partial?: boolean }) {
  const props = bot.transformers.desiredProperties.pollMedia
  const pollMedia = {} as SetupDesiredProps<PollMedia, TransformersDesiredProperties, DesiredPropertiesBehavior>

  if (props.text && payload.text) pollMedia.text = payload.text
  if (props.emoji && payload.emoji) pollMedia.emoji = bot.transformers.emoji(bot, payload.emoji as DiscordEmoji)

  return callCustomizer('pollMedia', bot, payload, pollMedia, {
    partial: extra?.partial ?? false,
  })
}
