import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotChannelPermissions } from "../../util/permissions.ts";

/** Removes all reactions for all emojis on this message. */
export async function removeAllReactions(channelId: string, messageId: string) {
  await requireBotChannelPermissions(channelId, ["MANAGE_MESSAGES"]);

  const result = await rest.runMethod(
    "delete",
    endpoints.CHANNEL_MESSAGE_REACTIONS(channelId, messageId),
  );

  return result;
}
