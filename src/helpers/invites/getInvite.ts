import { GetInvite } from "../../types/invites/getInvite.ts";
import type { InviteMetadata } from "../../types/invites/inviteMetadata.ts";
import type { Bot } from "../../bot.ts";

/** Returns an invite for the given code or throws an error if the invite doesn't exists. */
export async function getInvite(bot: Bot, inviteCode: string, options?: GetInvite) {
  const result = await bot.rest.runMethod<InviteMetadata>(bot.rest, "get", bot.constants.endpoints.INVITE_FETCH(inviteCode, {
    with_counts: options?.withCounts || false,
    with_expiration: options?.withExpiration || false,
    guild_scheduled_event_id: options?.scheduledEventId?.toString() || "",
  }));

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
