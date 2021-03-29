import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Fetch a single message from the server. Requires VIEW_CHANNEL and READ_MESSAGE_HISTORY */
export async function getMessage(channelId: string, id: string) {
  await requireBotChannelPermissions(channelId, [
    "VIEW_CHANNEL",
    "READ_MESSAGE_HISTORY",
  ]);

  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGE(channelId, id),
  )) as MessageCreateOptions;

  return structures.createMessageStruct(result);
}
