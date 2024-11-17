import type { DiscordEmoji, DiscordPoll, DiscordPollMedia } from '@discordeno/types'
import type { InternalBot, Poll, PollMedia, PollResult } from '../index.js'

export function transformPoll(bot: InternalBot, payload: DiscordPoll): typeof bot.transformers.$inferredTypes.poll {
  const props = bot.transformers.desiredProperties.poll
  const poll = {} as Poll

  if (props.question && payload.question) poll.question = bot.transformers.pollMedia(bot, payload.question)
  if (props.answers && payload.answers)
    poll.answers = payload.answers.map((x) => ({ answerId: x.answer_id, pollMedia: bot.transformers.pollMedia(bot, x.poll_media) }))
  if (props.expiry && payload.expiry) poll.expiry = Date.parse(payload.expiry)
  if (props.allowMultiselect && payload.allow_multiselect) poll.allowMultiselect = payload.allow_multiselect
  if (props.layoutType) poll.layoutType = payload.layout_type
  if (props.results && payload.results) {
    poll.results = {} as PollResult
    const pollResultProps = bot.transformers.desiredProperties.pollResult

    if (pollResultProps.isFinalized && payload.results.is_finalized) poll.results.isFinalized = payload.results.is_finalized
    if (pollResultProps.answerCounts && payload.results.answer_counts)
      poll.results.answerCounts = payload.results.answer_counts.map((x) => ({ id: x.id, count: x.count, meVoted: x.me_voted }))
  }

  return bot.transformers.customizers.poll(bot, payload, poll)
}

export function transformPollMedia(bot: InternalBot, payload: DiscordPollMedia): typeof bot.transformers.$inferredTypes.pollMedia {
  const props = bot.transformers.desiredProperties.pollMedia
  const pollMedia = {} as PollMedia

  if (props.text && payload.text) pollMedia.text = payload.text
  if (props.emoji && payload.emoji) pollMedia.emoji = bot.transformers.emoji(bot, payload.emoji as DiscordEmoji)

  return bot.transformers.customizers.pollMedia(bot, payload, pollMedia)
}
