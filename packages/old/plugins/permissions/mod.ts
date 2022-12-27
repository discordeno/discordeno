import { BotWithCache } from './deps.js'
import { channels } from './src/channels/index.js.js'
import { emojis } from './src/emojis/index.js.js'
import { guilds } from './src/guilds/index.js.js'
import { integrations } from './src/integrations/index.js.js'
import { members } from './src/members/index.js.js'
import { messages } from './src/messages/index.js.js'
import { roles } from './src/roles/index.js.js'
import { stickers } from './src/stickers/index.js.js'
import { webhooks } from './src/webhooks/index.js.js'

// PLUGINS MUST TAKE A BOT ARGUMENT WHICH WILL BE MODIFIED
export function enablePermissionsPlugin<B extends BotWithCache = BotWithCache> (bot: B): B {
  // PERM CHECKS REQUIRE CACHE DUH!
  if (!bot.enabledPlugins?.has('CACHE')) throw new Error('The PERMISSIONS plugin requires the CACHE plugin first.')

  // MARK THIS PLUGIN BEING USED
  bot.enabledPlugins.add('PERMISSIONS')

  // BEGIN OVERRIDING HELPER FUNCTIONS
  channels(bot)
  emojis(bot)
  guilds(bot)
  integrations(bot)
  members(bot)
  messages(bot)
  roles(bot)
  stickers(bot)
  webhooks(bot)

  // PLUGINS MUST RETURN THE BOT
  return bot
}

export * from './src/permissions.js'
// DEFAULT MAKES IT SLIGHTLY EASIER TO USE
export default enablePermissionsPlugin
