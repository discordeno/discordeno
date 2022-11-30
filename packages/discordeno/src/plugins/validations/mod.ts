import { Bot } from './deps.js'
import { channels } from './src/channels/mod.js'
import { guilds } from './src/guilds/mod.js'
import { interactions } from './src/interaction/mod.js'
import { invites } from './src/invites/mod.js'
import { members } from './src/members/mod.js'
import { messages } from './src/messages/mod.js'
import { misc } from './src/misc/mod.js'
import { stickers } from './src/stickers/mod.js'
import { webhooks } from './src/webhooks/mod.js'

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enableValidationsPlugin<B extends Bot>(bot: B): B {
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

  // PLUGINS MUST RETURN THE BOT
  return bot
}

// EXPORT ALL UTIL FUNCTIONS
export * from './src/applicationCommandOptions.js'
export * from './src/attachments.js'
export * from './src/components.js'

// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enableValidationsPlugin
