import type { Bot } from "../../bot.ts";
import { DiscordInviteMetadata } from "../../types/discord.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(bot: Bot, inviteCode: string, options?: GetInvite) {
  let url = bot.constants.endpoints.INVITE(inviteCode);

  if (options) {
    url += "?";

    if (options.withCounts) url += `with_counts=${options.withCounts}`;
    if (options.withExpiration) url += `&with_expiration=${options.withExpiration}`;
    if (options.scheduledEventId) url += `&guild_scheduled_event_id=${options.scheduledEventId}`;
  }
  const result = await bot.rest.runMethod<DiscordInviteMetadata>(
    bot.rest,
    "get",
    url,
  );

  return bot.transformers.inviteMetadata(bot, result);
}

/** https://discord.com/developers/docs/resources/invite#get-invite */
export interface GetInvite {
  /** Whether the invite should contain approximate member counts */
  withCounts?: boolean;
  /** Whether the invite should contain the expiration date */
  withExpiration?: boolean;
  /** the guild scheduled event to include with the invite */
  scheduledEventId?: bigint;
}
