import type { Bot } from "../../bot.ts";
import { DiscordInviteMetadata } from "../../types/discord.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(bot: Bot, inviteCode: string, options?: GetInvite) {
  const result = await bot.rest.runMethod<DiscordInviteMetadata>(
    bot.rest,
    "GET",
    bot.constants.routes.INVITE(inviteCode, options),
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
