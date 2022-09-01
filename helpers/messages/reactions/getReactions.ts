import type { Bot } from "../../../bot.ts";
import { User } from "../../../transformers/member.ts";
import { DiscordUser } from "../../../types/discord.ts";
import { Collection } from "../../../util/collection.ts";

/** Get a list of users that reacted with this emoji. */
export async function getReactions(
  bot: Bot,
  channelId: bigint,
  messageId: bigint,
  reaction: string,
  options?: GetReactions,
): Promise<Collection<bigint, User>> {
  if (reaction.startsWith("<:")) {
    reaction = reaction.substring(2, reaction.length - 1);
  } else if (reaction.startsWith("<a:")) {
    reaction = reaction.substring(3, reaction.length - 1);
  }

  const results = await bot.rest.runMethod<DiscordUser[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, encodeURIComponent(reaction), options),
  );

  return new Collection(
    results.map((result) => {
      const user = bot.transformers.user(bot, result);
      return [user.id, user];
    }),
  );
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
  /** Get users after this user Id */
  after?: string;
  /** Max number of users to return (1-100) */
  limit?: number;
}
