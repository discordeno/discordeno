import type {
  AllowedMentions,
  BigString,
  DiscordChannel,
  DiscordCreateForumPostWithMessage,
  FileContent,
  MessageComponents,
  SnakeToCamelCaseNested,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'
import type { Embed } from '../../../transformers/embed.js'

/**
 * Creates a new thread in a forum channel, and sends a message within the created thread.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the forum channel to create the thread within.
 * @param options - The parameters for the creation of the thread.
 * @returns An instance of {@link DiscordChannel} with a nested {@link Message} object.
 *
 * @remarks
 * Requires the `CREATE_MESSAGES` permission.
 *
 * Fires a _Thread Create_ gateway event.
 * Fires a _Message Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel}
 *
 * @experimental
 */
export async function createForumThread (
  rest: RestManager,
  channelId: BigString,
  options: CreateForumPostWithMessage
): Promise<SnakeToCamelCaseNested<DiscordChannel>> {
  const result = await rest.runMethod<DiscordChannel>(
    rest,
    'POST',
    rest.constants.routes.FORUM_START(channelId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
      rate_limit_per_user: options.rateLimitPerUser,
      reason: options.reason,
      message: {
        content: options.content,
        embeds: options.embeds?.map((embed) =>
          rest.transformers.reverse.embed(rest, embed)
        ),
        allowed_mentions: options.allowedMentions
          ? {
              parse: options.allowedMentions?.parse,
              roles: options.allowedMentions?.roles?.map((id) => id.toString()),
              users: options.allowedMentions?.users?.map((id) => id.toString()),
              replied_user: options.allowedMentions?.repliedUser
            }
          : undefined,
        components: options.components?.map((component) =>
          rest.transformers.reverse.component(rest, component)
        ),
        file: options.file
      }
    } as DiscordCreateForumPostWithMessage
  )

  return snakeToCamelCaseNested(result)
}

export interface CreateForumPostWithMessage extends WithReason {
  /** 1-100 character thread name */
  name: string
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null
  /** The message contents (up to 2000 characters) */
  content?: string
  /** Embedded `rich` content (up to 6000 characters) */
  embeds?: Embed[]
  /** Allowed mentions for the message */
  allowedMentions?: AllowedMentions
  /** The contents of the file being sent */
  file?: FileContent | FileContent[]
  /** The components you would like to have sent in this message */
  components?: MessageComponents
}
