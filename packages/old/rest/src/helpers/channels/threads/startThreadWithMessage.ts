import { routes } from '@discordeno/constant'
import type {
  BigString,
  Camelize,
  DiscordChannel,
  DiscordStartThreadWithMessage,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Creates a thread, using an existing message as its point of origin.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the channel in which to create the thread.
 * @param messageId - The ID of the message to use as the thread's point of origin.
 * @param options - The parameters to use for the creation of the thread.
 * @returns An instance of the created {@link Channel | Thread}.
 *
 * @remarks
 * If called on a channel of type {@link ChannelTypes.GuildText}, creates a {@link ChannelTypes.GuildPublicThread}.
 * If called on a channel of type {@link ChannelTypes.GuildNews}, creates a {@link ChannelTypes.GuildNewsThread}.
 * Does not work on channels of type {@link ChannelTypes.GuildForum}.
 *
 * The ID of the created thread will be the same as the ID of the source message.
 *
 * Fires a _Thread Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#start-thread-from-message}
 */
export async function startThreadWithMessage (
  rest: RestManager,
  channelId: BigString,
  messageId: BigString,
  options: StartThreadWithMessage
): Promise<Camelize<DiscordChannel>> {
  const result = await rest.runMethod<DiscordChannel>(
    'POST',
    routes.THREAD_START_PUBLIC(channelId, messageId),
    {
      name: options.name,
      auto_archive_duration: options.autoArchiveDuration,
      rate_limit_per_user: options.rateLimitPerUser,
      reason: options.reason
    } as DiscordStartThreadWithMessage
  )

  return snakeToCamelCaseNested(result)
}

export interface StartThreadWithMessage extends WithReason {
  /** 1-100 character thread name */
  name: string
  /** Duration in minutes to automatically archive the thread after recent activity */
  autoArchiveDuration: 60 | 1440 | 4320 | 10080
  /** Amount of seconds a user has to wait before sending another message (0-21600) */
  rateLimitPerUser?: number | null
}
