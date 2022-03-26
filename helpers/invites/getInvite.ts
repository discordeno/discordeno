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

  return {
    code: result.code,
    guildId: result.guild?.id ? bot.transformers.snowflake(result.guild.id) : undefined,
    channelId: result.channel?.id ? bot.transformers.snowflake(result.channel.id) : undefined,
    inviter: result.inviter ? bot.transformers.user(bot, result.inviter) : undefined,
    targetType: result.target_type,
    targetUser: result.target_user ? bot.transformers.user(bot, result.target_user) : undefined,
    targetApplicationId: result.target_application?.id
      ? bot.transformers.snowflake(result.target_application.id)
      : undefined,
    approximatePresenceCount: result.approximate_presence_count,
    approximateMemberCount: result.approximate_member_count,
    expiresAt: result.expires_at ? Date.parse(result.expires_at) : undefined,
  };
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
