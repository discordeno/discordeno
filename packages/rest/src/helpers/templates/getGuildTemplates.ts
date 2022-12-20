import { routes } from '@discordeno/constant'
import type { BigString, DiscordTemplate } from '@discordeno/types'
import { Collection } from '@discordeno/utils'
import type { RestManager } from '../../restManager.js'
import type { Template } from '../../transformers/template.js'

/**
 * Gets the list of templates for a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to get the list of templates for.
 * @returns A collection of {@link Template} objects assorted by template code.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
 */
export async function getGuildTemplates (
  rest: RestManager,
  guildId: BigString
): Promise<Collection<string, Template>> {
  const results = await rest.runMethod<DiscordTemplate[]>(

    'GET',
    routes.GUILD_TEMPLATES(guildId)
  )

  return new Collection(
    results.map((result) => {
      const template = rest.transformers.template(rest, result)
      return [template.code, template]
    })
  )
}
