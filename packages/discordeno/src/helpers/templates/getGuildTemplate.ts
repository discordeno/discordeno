import type { Bot } from '../../bot.js'
import { Template } from '../../transformers/template.js'
import { DiscordTemplate } from '../../types/discord.js'

/**
 * Gets a template by its code.
 *
 * @param bot - The bot instance to use to make the request.
 * @param templateCode - The code of the template to get.
 * @returns An instance of {@link Template}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild-template#get-guild-template}
 */
export async function getGuildTemplate (bot: Bot, templateCode: string): Promise<Template> {
  const result = await bot.rest.runMethod<DiscordTemplate>(
    bot.rest,
    'GET',
    bot.constants.routes.TEMPLATE(templateCode)
  )

  return bot.transformers.template(bot, result)
}
