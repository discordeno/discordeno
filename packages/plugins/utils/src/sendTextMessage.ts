import type { BigString, Bot, CreateMessage, Message } from '@discordeno/bot'

/** Sends a text message. */
export async function sendTextMessage (
  bot: Bot,
  channelId: BigString,
  content: string | CreateMessage
): Promise<Message> {
  if (typeof content === 'string') content = { content }
  return await bot.helpers.sendMessage(channelId, content)
}
