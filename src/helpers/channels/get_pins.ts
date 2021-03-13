import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { MessageCreateOptions } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Get pinned messages in this channel. */
export async function getPins(channelID: string) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_PINS(channelID),
  )) as MessageCreateOptions[];

  return Promise.all(
    result.map((res) => structures.createMessageStruct(res)),
  );
}
