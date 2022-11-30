import { Bot } from '../../deps.js'

export function editBotProfile(bot: Bot) {
  const editBotProfile = bot.helpers.editBotProfile

  bot.helpers.editBotProfile = async function (options) {
    // Nothing was edited
    if (!options.username && options.botAvatarURL === undefined) {
      throw new Error(
        'There was no change to the username or avatar found in the request.'
      )
    }
    // Check username requirements if username was provided
    if (options.username) {
      if (options.username.length > 32) {
        throw new Error(
          'A username for the bot must be less than 32 characters.'
        )
      }
      if (options.username.length < 2) {
        throw new Error(
          'A username for the bot can not be less than 2 characters.'
        )
      }
      if (
        ['@', '#', ':', '```'].some((char) => options.username!.includes(char))
      ) {
        throw new Error('A bot username can not include @ # : or ```')
      }
      if (['discordtag', 'everyone', 'here'].includes(options.username)) {
        throw new Error(
          'A bot username can not be set to `discordtag` `everyone` and `here`'
        )
      }
    }

    return await editBotProfile(options)
  }
}
