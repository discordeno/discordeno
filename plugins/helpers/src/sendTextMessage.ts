import { Bot, Collection, CreateMessage } from "../deps.ts";

/** Sends a text message. */
export async function sendTextMessage(
  bot: Bot,
  channelId: bigint,
  content: string | CreateMessage,
) {
  if (typeof content === "string") content = { content };
  return bot.helpers.sendMessage(channelId, content);
}
