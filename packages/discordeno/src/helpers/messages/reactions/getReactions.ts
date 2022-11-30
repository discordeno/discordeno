import type { Bot } from "../../../bot.ts";
import { User } from "../../../transformers/member.ts";
import { DiscordUser } from "../../../types/discord.ts";
import { BigString } from "../../../types/shared.ts";
import { Collection } from "../../../util/collection.ts";

/** Get a list of users that reacted with this emoji. */
/**
 * Gets the list of users that reacted with an emoji to a message.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel the message to get the users for is in.
 * @param messageId - The ID of the message to get the users for.
 * @param reaction - The reaction for which to get the users.
 * @param options - The parameters for the fetching of the users.
 * @returns A collection of {@link User} objects assorted by user ID.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-reactions}
 */
export async function getReactions(
  bot: Bot,
  channelId: BigString,
  messageId: BigString,
  reaction: string,
  options?: GetReactions,
): Promise<Collection<bigint, User>> {
  reaction = processReactionString(reaction);

  const results = await bot.rest.runMethod<DiscordUser[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_MESSAGE_REACTION(channelId, messageId, reaction, options),
  );

  return new Collection(
    results.map((result) => {
      const user = bot.transformers.user(bot, result);
      return [user.id, user];
    }),
  );
}

export function processReactionString(reaction: string): string {
  if (reaction.startsWith("<:")) {
    return reaction.substring(2, reaction.length - 1);
  }

  if (reaction.startsWith("<a:")) {
    return reaction.substring(3, reaction.length - 1);
  }

  return reaction;
}

/** https://discord.com/developers/docs/resources/channel#get-reactions-query-string-params */
export interface GetReactions {
  /** Get users after this user Id */
  after?: string;
  /** Max number of users to return (1-100) */
  limit?: number;
}
