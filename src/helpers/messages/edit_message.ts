import { botID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { Message, structures } from "../../structures/mod.ts";
import {
  Errors,
  MessageContent,
  MessageCreateOptions,
  Permission,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Edit the message. */
export async function editMessage(
  message: Message,
  content: string | MessageContent,
) {
  if (message.author.id !== botID) {
    throw "You can only edit a message that was sent by the bot.";
  }

  if (typeof content === "string") content = { content };

  const requiredPerms: Permission[] = ["SEND_MESSAGES"];

  if (content.tts) requiredPerms.push("SEND_TTS_MESSAGES");

  await requireBotChannelPermissions(message.channelID, requiredPerms);

  if (content.content && content.content.length > 2000) {
    throw new Error(Errors.MESSAGE_MAX_LENGTH);
  }

  const result = await RequestManager.patch(
    endpoints.CHANNEL_MESSAGE(message.channelID, message.id),
    content,
  );

  return structures.createMessageStruct(result as MessageCreateOptions);
}
