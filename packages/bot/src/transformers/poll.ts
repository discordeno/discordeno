import type { DiscordEmoji, DiscordPoll, DiscordPollLayoutType, DiscordPollMedia } from '@discordeno/types'
import type { Bot, Emoji } from '../index.js'

export function transformPoll(bot: Bot, payload: DiscordPoll): Poll {
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

    if (props.results.isFinalized && payload.results.is_finalized) poll.results.isFinalized = payload.results.is_finalized
    if (props.results.answerCounts && payload.results.answer_counts)
      poll.results.answerCounts = payload.results.answer_counts.map((x) => ({ id: x.id, count: x.count, meVoted: x.me_voted }))
  }

  return bot.transformers.customizers.poll(bot, payload, poll)
}

export function transformPollMedia(bot: Bot, payload: DiscordPollMedia): PollMedia {
  const props = bot.transformers.desiredProperties.pollMedia
  const pollMedia = {} as PollMedia

  if (props.text && payload.text) pollMedia.text = payload.text
  if (props.emoji && payload.emoji) pollMedia.emoji = bot.transformers.emoji(bot, payload.emoji as DiscordEmoji)

  return bot.transformers.customizers.pollMedia(bot, payload, pollMedia)
}

export interface Poll {
  /** The question of the poll. Only `text` is supported. */
  question: PollMedia
  /** Each of the answers available in the poll. There is a maximum of 10 answers per poll. */
  answers: PollAnswer[]
  /**
   * The time when the poll ends.
   *
   * @remarks
   * `expiry` is marked as nullable to support non-expiring polls in the future, but all polls have an expiry currently.
   */
  expiry: number | null
  /** Whether a user can select multiple answers */
  allowMultiselect: boolean
  /** The layout type of the poll */
  layoutType: DiscordPollLayoutType
  /**
   * The results of the poll
   *
   * @remarks
   * This value will not be sent by discord under specific conditions where they don't fetch them on their backend. When this value is missing it should be interpreted as "Unknown results" and not as "No results"
   * The results may not be totally accurate while the poll has not ended. When it ends discord will re-calculate all the results and set {@link DiscordPollResult.is_finalized} to true
   */
  results?: PollResult
}

export interface PollMedia {
  /**
   * The text of the field
   *
   * @remarks
   * `text` should always be non-null for both questions and answers, but this is subject to changes.
   * The maximum length of `text` is 300 for the question, and 55 for any answer.
   */
  text?: string
  /**
   * The emoji of the field
   *
   * @remarks
   * When creating a poll answer with an emoji, one only needs to send either the `id` (custom emoji) or `name` (default emoji) as the only field.
   */
  emoji?: Partial<Emoji>
}

export interface PollAnswer {
  /**
   * The id of the answer
   *
   * @remarks
   * This id labels each answer. It starts at 1 and goes up sequentially. Discord recommend against depending on this sequence as it is an implementation detail.
   */
  answerId: number
  /** The data of the answer */
  pollMedia: PollMedia
}

export interface PollResult {
  /** Whether the votes have been precisely counted */
  isFinalized: boolean
  /** The counts for each answer */
  answerCounts: PollAnswerCount[]
}

export interface PollAnswerCount {
  /** The {@link PollAnswer.answerId | answerId} */
  id: number
  /** The number of votes for this answer */
  count: number
  /** Whether the current user voted for this answer */
  meVoted: boolean
}
