import { RequestManager } from "../../../../rest/request_manager.ts";
import { Message } from "../../../../types/lib/structures/message.ts";
import { endpoints } from "../../../../util/constants.ts";
import { cacheHandlers } from "../../../controllers/cache.ts";

/** Get a list of users that reacted with this emoji. */
export async function getReactions(
  message: Message,
  reaction: string,
  options?: DiscordGetReactionsParams,
) {
  const result = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGE_REACTION(message.channelID, message.id, reaction),
    options,
  )) as UserPayload[];

  return Promise.all(result.map(async (res) => {
    const member = await cacheHandlers.get("members", res.id);
    return member || res;
  }));
}
