import { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../deps.ts";
import { Collection } from "../../util/collection.ts";
import { hasProperty } from "../../util/utils.ts";

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  bot: Bot,
  channelId: bigint,
  options?: GetMessagesOptions,
) {
  if (options?.limit && (options.limit < 0 || options.limit > 100)) {
    throw new Error(bot.constants.Errors.INVALID_GET_MESSAGES_LIMIT);
  }

  const result = await bot.rest.runMethod<DiscordMessage[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_MESSAGES(channelId, options),
  );

  return new Collection(result.map((res) => {
    const msg = bot.transformers.message(bot, res);
    return [msg.id, msg];
  }));
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

export type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit;

export function isGetMessagesAfter(options: GetMessagesOptions): options is GetMessagesAfter {
  return hasProperty(options, "after");
}

export function isGetMessagesBefore(options: GetMessagesOptions): options is GetMessagesBefore {
  return hasProperty(options, "before");
}

export function isGetMessagesAround(options: GetMessagesOptions): options is GetMessagesAround {
  return hasProperty(options, "around");
}

export function isGetMessagesLimit(options: GetMessagesOptions): options is GetMessagesLimit {
  return hasProperty(options, "limit");
}
