import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export async function pin(channelID: string, messageID: string) {
  await requireBotChannelPermissions(channelID, ["MANAGE_MESSAGES"]);

  const result = await RequestManager.put(
    endpoints.CHANNEL_PIN(channelID, messageID),
  );

  return result;
}

// aliases
export { pin as pinMessage };
