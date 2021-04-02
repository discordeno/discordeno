import { cacheHandlers } from "../../cache.ts";
import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { sendMessage } from "../messages/send_message.ts";

/** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
export async function sendDirectMessage(
  memberId: string,
  content: string | MessageContent,
) {
  let dmChannel = await cacheHandlers.get("channels", memberId);
  if (!dmChannel) {
    // If not available in cache create a new one.
    const dmChannelData = await rest.runMethod("post", endpoints.USER_DM, {
      recipient_id: memberId,
    }) as DMChannelCreatePayload;
    const channelStruct = await structures.createChannelStruct(
      dmChannelData as unknown as ChannelCreatePayload,
    );
    // Recreate the channel and add it undert he users id
    await cacheHandlers.set("channels", memberId, channelStruct);
    dmChannel = channelStruct;
  }

  // If it does exist try sending a message to this user
  return sendMessage(dmChannel.id, content);
}
