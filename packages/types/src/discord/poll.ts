/** Types for: https://docs.discord.com/developers/resources/poll */

import type { DiscordEmoji } from './emoji.js';
import type { DiscordUser } from './user.js';

/** https://docs.discord.com/developers/resources/poll#poll-object-poll-object-structure */
export interface DiscordPoll {
  /** The question of the poll. Only `text` is supported. */
  question: DiscordPollMedia;
  /** Each of the answers available in the poll. There is a maximum of 10 answers per poll. */
  answers: DiscordPollAnswer[];
  /**
   * The time when the poll ends.
   *
   * @remarks
   * `expiry` is marked as nullable to support non-expiring polls in the future, but all polls have an expiry currently.
   */
  expiry: string | null;
  /** Whether a user can select multiple answers */
  allow_multiselect: boolean;
  /** The layout type of the poll */
  layout_type: DiscordPollLayoutType;
  /**
   * The results of the poll
   *
   * @remarks
   * This value will not be sent by discord under specific conditions where they don't fetch them on their backend. When this value is missing it should be interpreted as "Unknown results" and not as "No results"
   * The results may not be totally accurate while the poll has not ended. When it ends discord will re-calculate all the results and set {@link DiscordPollResult.is_finalized} to true
   */
  results?: DiscordPollResult;
}

/** https://docs.discord.com/developers/resources/poll#layout-type */
export enum DiscordPollLayoutType {
  /** The default layout */
  Default = 1,
}

/** https://docs.discord.com/developers/resources/poll#poll-media-object-poll-media-object-structure */
export interface DiscordPollMedia {
  /**
   * The text of the field
   *
   * @remarks
   * `text` should always be non-null for both questions and answers, but this is subject to changes.
   * The maximum length of `text` is 300 for the question, and 55 for any answer.
   */
  text?: string;
  /**
   * The emoji of the field
   *
   * @remarks
   * When creating a poll answer with an emoji, one only needs to send either the `id` (custom emoji) or `name` (default emoji) as the only field.
   */
  emoji?: Partial<DiscordEmoji>;
}

/** https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface DiscordPollAnswer {
  /**
   * The id of the answer
   *
   * @remarks
   * This id labels each answer. It starts at 1 and goes up sequentially. Discord recommend against depending on this value as is a implementation detail.
   */
  answer_id: number;
  /** The data of the answer */
  poll_media: DiscordPollMedia;
}

/** https://docs.discord.com/developers/resources/poll#poll-results-object-poll-results-object-structure */
export interface DiscordPollResult {
  /** Whether the votes have been precisely counted */
  is_finalized: boolean;
  /** The counts for each answer */
  answer_counts: DiscordPollAnswerCount[];
}

/** https://docs.discord.com/developers/resources/poll#poll-results-object-poll-results-object-structure */
export interface DiscordPollAnswerCount {
  /** The {@link DiscordPollAnswer.answer_id | answer_id} */
  id: number;
  /** The number of votes for this answer */
  count: number;
  /** Whether the current user voted for this answer */
  me_voted: boolean;
}

/** https://docs.discord.com/developers/resources/poll#get-answer-voters-response-body */
export interface DiscordGetAnswerVotesResponse {
  /** Users who voted for this answer */
  users: DiscordUser[];
}
