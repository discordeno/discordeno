import type {
  GetMessagesAfter,
  GetMessagesAround,
  GetMessagesBefore,
  GetMessagesLimit,
} from "../../types/messages/getMessages.ts";
import type { Message } from "../../types/messages/message.ts";
import type { Bot } from "../../bot.ts";

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  bot: Bot,
  channelId: bigint,
  options?: GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit,
) {
  if (options?.limit && (options.limit < 0 || options.limit > 100)) {
    throw new Error(bot.constants.Errors.INVALID_GET_MESSAGES_LIMIT);
  }

  if (options) {
    if (bot.utils.hasProperty(options, "around")) options.around = (options.around as bigint).toString();
    if (bot.utils.hasProperty(options, "before")) options.before = (options.before as bigint).toString();
    if (bot.utils.hasProperty(options, "after")) options.after = (options.after as bigint).toString();
  }

  const result = await bot.rest.runMethod<Message[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_MESSAGES(channelId),
    options,
  );

  return await Promise.all(result.map((res) => bot.transformers.message(bot, res)));
}
