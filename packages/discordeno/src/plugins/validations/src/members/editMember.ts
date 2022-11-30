import { Bot } from '../../deps.js'

export function editMember (bot: Bot) {
  const editMember = bot.helpers.editMember

  bot.helpers.editMember = async function (guildId, memberId, options) {
    if (options.nick && options.nick.length > 32) throw new Error('NICKNAMES_MAX_LENGTH')

    return await editMember(guildId, memberId, options)
  }
}
