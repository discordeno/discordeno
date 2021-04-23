import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { Message } from "../../types/messages/message.ts";
import { endpoints } from "../../util/constants.ts";

/** Get pinned messages in this channel. */
export async function getPins(channelId: string) {
  const result = await rest.runMethod<Message[]>(
    "get",
    endpoints.CHANNEL_PINS(channelId),
  );

  return Promise.all(
    result.map((res) => structures.createDiscordenoMessage(res)),
  );
}
