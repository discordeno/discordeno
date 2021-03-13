import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import {
  GetMessages,
  GetMessagesAfter,
  GetMessagesAround,
  GetMessagesBefore,
  MessageCreateOptions,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  channelID: string,
  options?:
    | GetMessagesAfter
    | GetMessagesBefore
    | GetMessagesAround
    | GetMessages,
) {
  await requireBotChannelPermissions(channelID, [
    "VIEW_CHANNEL",
    "READ_MESSAGE_HISTORY",
  ]);

  if (options?.limit && options.limit > 100) return;

  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGES(channelID),
    options,
  )) as MessageCreateOptions[];

  return Promise.all(
    result.map((res) => structures.createMessageStruct(res)),
  );
}
