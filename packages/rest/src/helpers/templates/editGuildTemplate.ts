import type {
  BigString,
  DiscordModifyGuildTemplate,
  DiscordTemplate
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Template } from '../../transformers/template.js'

/**
 * Edits a template's settings.
 *
 * @param rest - The rest manager to use to make the request.
 * @param guildId - The ID of the guild to edit a template of.
 * @param templateCode - The code of the template to edit.
 * @param options - The parameters for the edit of the template.
 * @returns An instance of the edited {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#modify-guild-template}
 */
export async function editGuildTemplate (
  rest: RestManager,
  guildId: BigString,
  templateCode: string,
  options: ModifyGuildTemplate
): Promise<Template> {
  const result = await rest.runMethod<DiscordTemplate>(
    rest,
    'PATCH',
    rest.constants.routes.GUILD_TEMPLATE(guildId, templateCode),
    {
      name: options.name,
      description: options.description
    } as DiscordModifyGuildTemplate
  )

  return rest.transformers.template(rest, result)
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string
  /** Description of the template (0-120 characters) */
  description?: string | null
}
