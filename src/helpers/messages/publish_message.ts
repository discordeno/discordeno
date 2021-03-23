import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Crosspost a message in a News Channel to following channels. */
export async function publishMessage(channelID: string, messageID: string) {
  const data = (await RequestManager.post(
    endpoints.CHANNEL_MESSAGE_CROSSPOST(channelID, messageID),
  )) as MessageCreateOptions;

  return structures.createMessageStruct(data);
}
