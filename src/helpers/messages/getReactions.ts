import type { GetReactions } from "../../types/messages/messageGetReactions.ts";
import type { User } from "../../types/users/user.ts";
import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";

/** Get a list of users that reacted with this emoji. */
export async function getReactions(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
  options?: GetReactions
) {
  const users = await bot.rest.runMethod<User[]>(
    bot.rest,
    "get",
    bot.constants.endpoints.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction),
    options
  );

  return new Collection(users.map((user) => [user.id, user]));
}
