import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { DiscordMessage } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Get pinned messages in this channel. */
export async function getPins(channelId: string) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_PINS(channelId),
  )) as DiscordMessage[];

  return Promise.all(
    result.map((res) => structures.createMessageStruct(res)),
  );
}
