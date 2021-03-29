import { RequestManager } from "../../rest/request_manager.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";

/** Get a list of users that reacted with this emoji. */
export async function getReactions(
  channelId: string,
  messageId: string,
  reaction: string,
  options?: DiscordGetReactionsParams,
) {
  const users = (await RequestManager.get(
    endpoints.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
    options,
  )) as UserPayload[];

  return new Collection(users.map((user) => [user.id, user]));
}
