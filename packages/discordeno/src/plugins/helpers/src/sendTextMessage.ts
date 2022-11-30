import { BigString, Bot, CreateMessage } from "../deps.ts";

/** Sends a text message. */
export async function sendTextMessage(
  bot: Bot,
  channelId: BigString,
  content: string | CreateMessage,
) {
  if (typeof content === "string") content = { content };
  return bot.helpers.sendMessage(channelId, content);
}
