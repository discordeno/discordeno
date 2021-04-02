import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Crosspost a message in a News Channel to following channels. */
export async function publishMessage(channelId: string, messageId: string) {
  const data =
    (await rest.runMethod(
      "post",
      endpoints.CHANNEL_MESSAGE_CROSSPOST(channelId, messageId),
    )) as MessageCreateOptions;

  return structures.createMessageStruct(data);
}
