import type { DiscordApplication } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Application } from '../../transformers/application.js'

/** Get the applications info */
export async function getApplicationInfo (
  rest: RestManager
): Promise<Application> {
  const result = await rest.runMethod<DiscordApplication>(
    rest,
    'GET',
    rest.constants.routes.OAUTH2_APPLICATION()
  )

  return rest.transformers.application(rest, result)
}
