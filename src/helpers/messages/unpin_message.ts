import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Unpin a message in a channel. Requires MANAGE_MESSAGES. */
export async function unpin(channelId: string, messageId: string) {
  await requireBotChannelPermissions(channelId, ["MANAGE_MESSAGES"]);

  const result = await RequestManager.delete(
    endpoints.CHANNEL_PIN(channelId, messageId),
  );

  return result;
}

// aliases
export { unpin as unpinMessage };
