import { Bot, CreateMessage } from "../deps.ts";

/** Sends a message to a channel. */
export async function sendTextMessage(
  bot: Bot,
  channelId: bigint,
  content: string | CreateMessage,
) {
  if (typeof content === "string") content = { content };
  return bot.helpers.sendMessage(channelId, content);
}
