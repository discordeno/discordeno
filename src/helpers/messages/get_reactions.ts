import { rest } from "../../rest/rest.ts";
import { DiscordUser } from "../../types/users/user.ts";
import { Collection } from "../../util/collection.ts";
import { endpoints } from "../../util/constants.ts";
import {GetReactions} from "../../types/messages/message_get_reactions.ts";

/** Get a list of users that reacted with this emoji. */
export async function getReactions(
  channelId: string,
  messageId: string,
  reaction: string,
  options?: GetReactions,
) {
  const users = (await rest.runMethod(
    "get",
    endpoints.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
    options,
  )) as DiscordUser[];

  return new Collection(users.map((user) => [user.id, user]));
}
