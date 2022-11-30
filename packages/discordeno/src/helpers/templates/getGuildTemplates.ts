import type { Bot } from '../../bot.js'
import { Template } from '../../transformers/template.js'
import { DiscordTemplate } from '../../types/discord.js'
import { BigString } from '../../types/shared.js'
import { Collection } from '../../util/collection.js'

/**
 * Gets the list of templates for a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to get the list of templates for.
 * @returns A collection of {@link Template} objects assorted by template code.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-templates}
 */
export async function getGuildTemplates (bot: Bot, guildId: BigString): Promise<Collection<string, Template>> {
  const results = await bot.rest.runMethod<DiscordTemplate[]>(
    bot.rest,
    'GET',
    bot.constants.routes.GUILD_TEMPLATES(guildId)
  )

  return new Collection(
    results.map((result) => {
      const template = bot.transformers.template(bot, result)
      return [template.code, template]
    })
  )
}
