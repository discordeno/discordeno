import type {
  GetMessagesAfter,
  GetMessagesAround,
  GetMessagesBefore,
  GetMessagesLimit,
} from "../../types/messages/get_messages.ts";
import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";
import type {SnakeCasedPropertiesDeep} from "../../types/util.ts";

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  bot: Bot,
  channelId: bigint,
  options?: GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit
) {
  await bot.utils.requireBotChannelPermissions(bot, channelId, ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]);

  if (options?.limit && (options.limit < 0 || options.limit > 100)) {
    throw new Error(bot.constants.Errors.INVALID_GET_MESSAGES_LIMIT);
  }

  const result = await bot.rest.runMethod<SnakeCasedPropertiesDeep<Message>[]>(bot.rest, "get", bot.constants.endpoints.CHANNEL_MESSAGES(channelId), options);

  return await Promise.all(result.map((res) => bot.transformers.message(bot, res)));
}
