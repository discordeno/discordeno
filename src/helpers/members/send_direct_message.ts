import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import {
  ChannelCreatePayload,
  DMChannelCreatePayload,
  MessageContent,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { sendMessage } from "../messages/send_message.ts";

/** Send a message to a users DM. Note: this takes 2 API calls. 1 is to fetch the users dm channel. 2 is to send a message to that channel. */
export async function sendDirectMessage(
  memberID: string,
  content: string | MessageContent,
) {
  let dmChannel = await cacheHandlers.get("channels", memberID);
  if (!dmChannel) {
    // If not available in cache create a new one.
    const dmChannelData = await RequestManager.post(
      endpoints.USER_DM,
      { recipient_id: memberID },
    ) as DMChannelCreatePayload;
    const channelStruct = await structures.createChannelStruct(
      dmChannelData as unknown as ChannelCreatePayload,
    );
    // Recreate the channel and add it undert he users id
    await cacheHandlers.set("channels", memberID, channelStruct);
    dmChannel = channelStruct;
  }

  // If it does exist try sending a message to this user
  return sendMessage(dmChannel.id, content);
}
