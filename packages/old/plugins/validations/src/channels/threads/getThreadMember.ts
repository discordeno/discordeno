import type { Bot} from '../../../deps.js';
import { GatewayIntents } from '../../../deps.js'

export function getThreadMembers (bot: Bot) {
  const getThreadMembers = bot.helpers.getThreadMembers

  bot.helpers.getThreadMembers = async function (threadId) {
    const hasIntent = bot.intents & GatewayIntents.GuildMembers
    if (!hasIntent) throw new Error('The get thread members endpoint requires GuildMembers intent.')
    return await getThreadMembers(threadId)
  }
}
