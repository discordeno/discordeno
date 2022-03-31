import { Collection } from "../../util/collection.ts";
import type { Bot } from "../../bot.ts";
import { DiscordUser } from "../../types/discord.ts";

/** Get a list of users that reacted with this emoji. */
export async function getReactions(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
  options?: GetReactions,
) {
  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  let url = bot.constants.endpoints.CHANNEL_MESSAGE_REACTION(channelId, messageId, encodeURIComponent(reaction));

  if (options) {
    url += "?";

    if (options.after) url += `after=${options.after}`;
    if (options.limit) url += `&limit=${options.limit}`;
  }

  const users = await bot.rest.runMethod<DiscordUser[]>(
    bot.rest,
    "get",
    url,
  );

  return new Collection(users.map((u) => {
    const user = bot.transformers.user(bot, u);
    return [user.id, user];
  }));
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
  /** Get users after this user Id */
  after?: string;
  /** Max number of users to return (1-100) */
  limit?: number;
}
