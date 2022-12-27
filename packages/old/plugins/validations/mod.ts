import type { Bot } from './deps.js'
import { channels } from './src/channels/index.js.js'
import { guilds } from './src/guilds/index.js.js'
import { interactions } from './src/interaction/index.js.js'
import { invites } from './src/invites/index.js.js'
import { members } from './src/members/index.js.js'
import { messages } from './src/messages/index.js.js'
import { misc } from './src/misc/index.js.js'
import { stickers } from './src/stickers/index.js.js'
import { webhooks } from './src/webhooks/index.js.js'

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enableValidationsPlugin<B extends Bot> (bot: B): B {
  // MARK THIS PLUGIN BEING USED
  bot.enabledPlugins.add('VALIDATIONS')

  // BEGIN OVERRIDING HELPER FUNCTIONS
  channels(bot)
  guilds(bot)
  interactions(bot)
  invites(bot)
  members(bot)
  messages(bot)
  misc(bot)
  stickers(bot)
  webhooks(bot)

  // TODO: validations createGuildTemplate
  // if (options.name.length < 1 || options.name.length > 100) {
  //   throw new Error('The name can only be in between 1-100 characters.')
  // }

  // if (options.description?.length && options.description.length > 120) {
  //   throw new Error('The description can only be in between 0-120 characters.')
  // }

  // TODO: validations editGuildTemplate
  // if (
  //   options.name?.length &&
  //   (options.name.length < 1 || options.name.length > 100)
  // ) {
  //   throw new Error('The name can only be in between 1-100 characters.')
  // }

  // if (options.description?.length && options.description.length > 120) {
  //   throw new Error('The description can only be in between 0-120 characters.')
  // }

  // PLUGINS MUST RETURN THE BOT
  return bot
}

// EXPORT ALL UTIL FUNCTIONS
export * from './src/applicationCommandOptions.js'
export * from './src/attachments.js'
export * from './src/components.js'

// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enableValidationsPlugin
