import { botID } from "../../../bot.ts";
import { RequestManager } from "../../../rest/request_manager.ts";
import { Message } from "../../../types/lib/structures/message.ts";
import { endpoints } from "../../../util/constants.ts";
import { botHasChannelPermissions } from "../../../util/permissions.ts";
import { structures } from "../../structures/mod.ts";

/** Edit the message. */
export async function editMessage(
    message: Message,
    content: string | MessageContent,
  ) {
    if (
      message.author.id !== botID
    ) {
      throw "You can only edit a message that was sent by the bot.";
    }
  
    if (typeof content === "string") content = { content };
  
    const hasSendMessagesPerm = await botHasChannelPermissions(
      message.channelID,
      ["SEND_MESSAGES"],
    );
    if (
      !hasSendMessagesPerm
    ) {
      throw new Error(Errors.MISSING_SEND_MESSAGES);
    }
  
    const hasSendTtsMessagesPerm = await botHasChannelPermissions(
      message.channelID,
      ["SEND_TTS_MESSAGES"],
    );
    if (
      content.tts &&
      !hasSendTtsMessagesPerm
    ) {
      throw new Error(Errors.MISSING_SEND_TTS_MESSAGE);
    }
  
    if (content.content && content.content.length > 2000) {
      throw new Error(Errors.MESSAGE_MAX_LENGTH);
    }
  
    const result = await RequestManager.patch(
      endpoints.CHANNEL_MESSAGE(message.channelID, message.id),
      content,
    );
  
    return structures.createMessageStruct(result as MessageCreateOptions);
  }