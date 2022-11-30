import { BigString, Bot, CreateMessage } from '../deps.js'

/** Sends a text message. */
export async function sendTextMessage (
  bot: Bot,
  channelId: BigString,
  content: string | CreateMessage
) {
  if (typeof content === 'string') content = { content }
  return await bot.helpers.sendMessage(channelId, content)
}
