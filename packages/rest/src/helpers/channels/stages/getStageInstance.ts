import { routes } from '@discordeno/constant'
import type {
  BigString,
  Camelize,
  DiscordStageInstance
} from '@discordeno/types'
import type { RestManager } from '../../../restManager.js'
import { snakeToCamelCaseNested } from '../../../transformer.js'

/**
 * Gets the stage instance associated with a stage channel, if one exists.
 *
 * @param rest - The rest manager to use to make the request.
 * @param channelId - The ID of the stage channel the stage instance is associated with.
 * @returns An instance of {@link DiscordStageInstance}.
 *
 * @see {@link https://discord.com/developers/docs/resources/stage-instance#get-stage-instance}
 */
export async function getStageInstance (
  rest: RestManager,
  channelId: BigString
): Promise<Camelize<DiscordStageInstance>> {
  const result = await rest.runMethod<DiscordStageInstance>(
    rest,
    'GET',
    routes.STAGE_INSTANCE(channelId)
  )

  return snakeToCamelCaseNested(result)
}
