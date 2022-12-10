import type { RestManager } from '../../restManager.js'
import type { Template } from '../../transformers/template.js'
import type { DiscordTemplate, BigString } from '@discordeno/types'

/**
 * Synchronises a template with the current state of a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to synchronise a template of.
 * @returns An instance of the edited {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
 */
export async function syncGuildTemplate (
  rest: RestManager,
  guildId: BigString,
  templateCode: string
): Promise<Template> {
  const result = await rest.runMethod<DiscordTemplate>(
    rest,
    'PUT',
    rest.constants.routes.GUILD_TEMPLATE(guildId, templateCode)
  )

  return rest.transformers.template(rest, result)
}
