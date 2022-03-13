import type { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../types/discord.ts";

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

  const result = await bot.rest.runMethod<DiscordMessage[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_MESSAGES(channelId),
    options,
  );

  return await Promise.all(result.map((res) => bot.transformers.message(bot, res)));
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesLimit {
  /** Max number of messages to return (1-100) default 50 */
  limit?: number;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAround extends GetMessagesLimit {
  /** Get messages around this message id */
  around?: bigint;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesBefore extends GetMessagesLimit {
  /** Get messages before this message id */
  before?: bigint;
}

/** https://discord.com/developers/docs/resources/channel#get-channel-messages-query-string-params */
export interface GetMessagesAfter extends GetMessagesLimit {
  /** Get messages after this message id */
  after?: bigint;
}
