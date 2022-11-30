import type { Bot } from "../../../bot.ts";
import { WithReason } from "../../../mod.ts";
import { DiscordInvite } from "../../../types/discord.ts";
import { BigString, TargetTypes } from "../../../types/shared.ts";
import { BaseInvite } from "./getInvite.ts";

/**
 * Creates an invite to a channel in a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to create the invite to.
 * @param options - The parameters for the creation of the invite.
 * @returns An instance of the created {@link BaseInvite | Invite}.
 *
 * @remarks
 * Requires the `CREATE_INSTANT_INVITE` permission.
 *
 * Fires an _Invite Create_ gateway event.
 *
 * @privateRemarks
 * The request body is not optional, and an empty JSON object must be sent regardless of whether any fields are being transmitted.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#create-channel-invite}
 */
export async function createInvite(
  bot: Bot,
  channelId: BigString,
  options: CreateChannelInvite = {},
): Promise<BaseInvite> {
  const result = await bot.rest.runMethod<DiscordInvite>(
    bot.rest,
    "POST",
    bot.constants.routes.CHANNEL_INVITES(channelId),
    {
      max_age: options.maxAge,
      max_uses: options.maxUses,
      temporary: options.temporary,
      unique: options.unique,
      target_type: options.targetType,
      target_user_id: options.targetUserId?.toString(),
      target_application_id: options.targetApplicationId?.toString(),
      reason: options.reason,
    },
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

export interface CreateChannelInvite extends WithReason {
  /** Duration of invite in seconds before expiry, or 0 for never. Between 0 and 604800 (7 days). Default: 86400 (24 hours) */
  maxAge?: number;
  /** Max number of users or 0 for unlimited. Between 0 and 100. Default: 0 */
  maxUses?: number;
  /** Whether this invite only grants temporary membership. Default: false */
  temporary?: boolean;
  /** If true, don't try to reuse similar invite (useful for creating many unique one time use invites). Default: false */
  unique?: boolean;
  /** The type of target for this voice channel invite */
  targetType?: TargetTypes;
  /** The id of the user whose stream to display for this invite, required if `target_type` is 1, the user must be streaming in the channel */
  targetUserId?: BigString;
  /** The id of the embedded application to open for this invite, required if `target_type` is 2, the application must have the `EMBEDDED` flag */
  targetApplicationId?: BigString;
}
