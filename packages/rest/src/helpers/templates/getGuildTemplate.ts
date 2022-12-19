import { routes } from '@discordeno/constant'
import type { DiscordTemplate } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Template } from '../../transformers/template.js'

/**
 * Gets a template by its code.
 *
 * @param rest - The rest manager to use to make the request.
 * @param templateCode - The code of the template to get.
 * @returns An instance of {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-template}
 */
export async function getGuildTemplate (
  rest: RestManager,
  templateCode: string
): Promise<Template> {
  const result = await rest.runMethod<DiscordTemplate>(
    rest,
    'GET',
    routes.TEMPLATE(templateCode)
  )

  return rest.transformers.template(rest, result)
}
