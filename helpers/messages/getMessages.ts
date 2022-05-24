import type { Bot } from "../../bot.ts";
import { DiscordMessage } from "../../types/discord.ts";

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  bot: Bot,
  channelId: bigint,
  options?: GetMessagesOptions,
) {
  if (options?.limit && (options.limit < 0 || options.limit > 100)) {
    throw new Error(bot.constants.Errors.INVALID_GET_MESSAGES_LIMIT);
  }

  let url = bot.constants.endpoints.CHANNEL_MESSAGES(channelId);

  if (options) {
    url += "?";
    if (isGetMessagesAfter(options) && options.after) url += `after=${options.after}`;
    if (isGetMessagesBefore(options) && options.before) url += `&before=${options.before}`;
    if (isGetMessagesAround(options) && options.around) url += `&around=${options.around}`;
    if (isGetMessagesLimit(options) && options.limit) url += `&limit=${options.limit}`;
  }

  const result = await bot.rest.runMethod<DiscordMessage[]>(
    bot.rest,
    "GET",
    url,
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

export type GetMessagesOptions = GetMessagesAfter | GetMessagesBefore | GetMessagesAround | GetMessagesLimit;

export function isGetMessagesAfter(options: GetMessagesOptions): options is GetMessagesAfter {
  return Reflect.has(options, "after");
}

export function isGetMessagesBefore(options: GetMessagesOptions): options is GetMessagesBefore {
  return Reflect.has(options, "before");
}

export function isGetMessagesAround(options: GetMessagesOptions): options is GetMessagesAround {
  return Reflect.has(options, "around");
}

export function isGetMessagesLimit(options: GetMessagesOptions): options is GetMessagesLimit {
  return Reflect.has(options, "limit");
}
