import type { Bot } from "../../../bot.ts";
import { BigString, ScheduledEvent, TargetTypes, User } from "../../../mod.ts";
import { DiscordInviteMetadata } from "../../../types/discord.ts";

export type BaseInvite = {
  code: string;
  guildId?: BigString;
  channelId?: BigString;
  inviter?: User;
  targetType?: TargetTypes;
  targetUser?: User;
  targetApplicationId?: BigString;
  approximatePresenceCount?: number;
  approximateMemberCount?: number;
  expiresAt?: number;
  guildScheduledEvent?: ScheduledEvent;
};

export type InviteMetadata = BaseInvite & {
  uses: number;
  maxUses: number;
  maxAge: number;
  temporary: boolean;
  createdAt: number;
};

/**
 * Gets an invite to a channel by its invite code.
 *
 * @param bot - The bot instance to use to make the request.
 * @param inviteCode - The invite code of the invite to get.
 * @param options - The parameters for the fetching of the invite.
 * @returns An instance of {@link BaseInvite | Invite}.
 *
 * @see {@link https://discord.com/developers/docs/resources/invite#get-invite}
 */
export async function getInvite(bot: Bot, inviteCode: string, options?: GetInvite): Promise<BaseInvite> {
  const result = await bot.rest.runMethod<DiscordInviteMetadata>(
    bot.rest,
    "GET",
    bot.constants.routes.INVITE(inviteCode, options),
  );

  return {
    code: result.code,
    guildId: result.guild?.id ? bot.transformers.snowflake(result.guild.id) : undefined,
    channelId: result.channel?.id ? bot.transformers.snowflake(result.channel.id) : undefined,
    inviter: result.inviter ? bot.transformers.user(bot, result.inviter) : undefined,
    targetType: result.target_type
      ? (result.target_type === 1 ? TargetTypes.Stream : TargetTypes.EmbeddedApplication)
      : undefined,
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
  scheduledEventId?: BigString;
}
