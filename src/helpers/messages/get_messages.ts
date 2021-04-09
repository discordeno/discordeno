import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Fetches between 2-100 messages. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessages(
  channelId: string,
  options?:
    | GetMessagesAfter
    | GetMessagesBefore
    | GetMessagesAround
    | GetMessages,
) {
  await requireBotChannelPermissions(channelId, [
    "VIEW_CHANNEL",
    "READ_MESSAGE_HISTORY",
  ]);

  if (options?.limit && options.limit > 100) return;

  const result = (await rest.runMethod(
    "get",
    endpoints.CHANNEL_MESSAGES(channelId),
    options,
  )) as MessageCreateOptions[];

  return Promise.all(
    result.map((res) => structures.createDiscordenoMessage(res)),
  );
}
