import { routes } from '@discordeno/constant'
import type {
  BigString,
  Camelize,
  DiscordStageInstance,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Creates a stage instance associated with a stage channel.
 *
 * @param rest - The rest manager to use to make the request.
 * @param options - The parameters for the creation of the stage instance.
 * @returns An instance of the created {@link DiscordStageInstance}.
 *
 * @remarks
 * Requires the user to be a moderator of the stage channel.
 *
 * Fires a _Stage Instance Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#create-stage-instance}
 */
export async function createStageInstance (
  rest: RestManager,
  options: CreateStageInstance
): Promise<Camelize<DiscordStageInstance>> {
  const result = await rest.runMethod<DiscordStageInstance>(
    'POST',
    routes.STAGE_INSTANCES(),
    {
      channel_id: options.channelId.toString(),
      topic: options.topic,
      send_start_notification: options.sendStartNotification,
      reason: options.reason
    }
  )

  return snakeToCamelCaseNested(result)
}

export interface CreateStageInstance extends WithReason {
  channelId: BigString
  topic: string
  /** Notify @everyone that the stage instance has started. Requires the MENTION_EVERYONE permission. */
  sendStartNotification?: boolean
}
