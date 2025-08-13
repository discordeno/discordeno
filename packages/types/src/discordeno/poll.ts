/** Types for: https://discord.com/developers/docs/resources/poll */

import type { DiscordPollAnswer, DiscordPollLayoutType, DiscordPollMedia } from '../discord/poll.js'
import type { BigString, Camelize } from '../shared.js'

/** https://discord.com/developers/docs/resources/poll#poll-create-request-object */
export interface CreatePoll {
  /** The question of the poll. Only `text` is supported. */
  question: Pick<Camelize<DiscordPollMedia>, 'text'>
  /** Each of the answers available in the poll, up to 10 */
  answers: Omit<Camelize<DiscordPollAnswer>, 'answerId'>[]
  /**
   * Number of hours the poll should be open for
   *
   * @remarks
   * up to 32 days
   *
   * @default 24
   */
  duration: number
  /**
   * Whether a user can select multiple answers
   *
   * @default false
   */
  allowMultiselect: boolean
  /**
   * The layout type of the poll
   *
   * @default DiscordPollLayoutType.Default
   */
  layoutType?: DiscordPollLayoutType
}

/** https://discord.com/developers/docs/resources/poll#get-answer-voters-query-string-params */
export interface GetPollAnswerVotes {
  /** Get users after this user ID */
  after?: BigString
  /**
   * Max number of users to return (1-100)
   *
   * @default 25
   */
  limit?: number
}
