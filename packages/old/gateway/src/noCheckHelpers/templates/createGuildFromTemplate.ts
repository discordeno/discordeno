import { routes } from '@discordeno/constant'
import TRANSFORMERS from '@discordeno/transformer'
import type { DiscordGuild } from '@discordeno/types'
import type { Guild } from '../../../../bot/transformers/guild.js'
import type { RestManager } from '../../../../rest/src/restManager.js'

/**
 * Creates a guild from a template.
 *
 * @param rest - The rest manager to use to make the request.
 * @param templateCode - The code of the template.
 * @param options - The parameters for the creation of the guild.
 * @returns An instance of the created {@link Guild}.
 *
 * @remarks
 * ⚠️ This route can only be used by bots in __fewer than 10 guilds__.
 *
 * Fires a _Guild Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#create-guild-from-guild-template}
 */
export async function createGuildFromTemplate (
  rest: RestManager,
  templateCode: string,
  numberOfShard: number,
  options: CreateGuildFromTemplate
): Promise<Guild> {
  // TODO: validations
  // if (options.icon) {
  //   options.icon = await urlToBase64(options.icon)
  // }

  const createdGuild = await rest.runMethod<DiscordGuild>(

    'POST',
    routes.TEMPLATE(templateCode),
    options
  )

  return TRANSFORMERS.guild(createdGuild)
}

/** https://discord.com/developers/docs/resources/template#create-guild-from-template-json-params */
export interface CreateGuildFromTemplate {
  /** Name of the guild (2-100 characters) */
  name: string
  /** base64 128x128 image for the guild icon */
  icon?: string
}
