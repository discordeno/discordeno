import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Pin a message in a channel. Requires MANAGE_MESSAGES. Max pins allowed in a channel = 50. */
export async function pin(channelId: bigint, messageId: bigint) {
  await requireBotChannelPermissions(channelId, ["MANAGE_MESSAGES"]);

  return await rest.runMethod<undefined>("put", endpoints.CHANNEL_PIN(channelId, messageId));
}

// aliases
export { pin as pinMessage };
