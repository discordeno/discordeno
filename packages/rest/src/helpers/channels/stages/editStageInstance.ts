import type {
  BigString,
  DiscordStageInstance,
  SnakeToCamelCaseNested,
  WithReason
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Edits a stage instance.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the stage channel the stage instance is associated with.
 * @returns An instance of the updated {@link DiscordStageInstance}.
 *
 * @remarks
 * Requires the user to be a moderator of the stage channel.
 *
 * Fires a _Stage Instance Update_ event.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance}
 */
export async function editStageInstance (
  rest: RestManager,
  channelId: BigString,
  data: EditStageInstanceOptions
): Promise<SnakeToCamelCaseNested<DiscordStageInstance>> {
  const result = await rest.runMethod<DiscordStageInstance>(
    rest,
    'PATCH',
    rest.constants.routes.STAGE_INSTANCE(channelId),
    {
      topic: data.topic
    }
  )

  return snakeToCamelCaseNested(result)
}

export interface EditStageInstanceOptions extends WithReason {
  /** The topic of the Stage instance (1-120 characters) */
  topic: string
}
