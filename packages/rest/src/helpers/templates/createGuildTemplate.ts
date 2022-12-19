import { routes } from '@discordeno/constant'
import type { BigString, DiscordCreateTemplate, DiscordTemplate } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Template } from '../../transformers/template.js'

/**
 * Creates a template from a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to create the template from.
 * @param options - The parameters for the creation of the template.
 * @returns An instance of the created {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-template}
 */
export async function createGuildTemplate (
  rest: RestManager,
  guildId: BigString,
  options: CreateTemplate
): Promise<Template> {
  const result = await rest.runMethod<DiscordTemplate>(
    rest,
    'POST',
    routes.GUILD_TEMPLATES(guildId),
    options as DiscordCreateTemplate
  )

  return rest.transformers.template(rest, result)
}

export interface CreateTemplate {
  /** Name which the template should have */
  name: string
  /** Description of the template */
  description?: string
}
