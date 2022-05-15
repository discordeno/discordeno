import { Bot } from "../bot.ts";
import { DiscordInvite } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";

export function transformInvite(bot: Bot, payload: DiscordInvite) {
  const transformedInvite = {
    code: payload.code,
    guildId: payload.guild?.id ? bot.transformers.snowflake(payload.guild.id) : undefined,
    channelId: payload.channel?.id ? bot.transformers.snowflake(payload.channel.id) : undefined,
    inviter: payload.inviter ? bot.transformers.user(bot, payload.inviter) : undefined,
    targetType: payload.target_type,
    targetUser: payload.target_user ? bot.transformers.user(bot, payload.target_user) : undefined,
    targetApplicationId: payload.target_application?.id
      ? bot.transformers.snowflake(payload.target_application.id)
      : undefined,
    approximatePresenceCount: payload.approximate_presence_count,
    approximateMemberCount: payload.approximate_member_count,
    expiresAt: payload.expires_at ? Date.parse(payload.expires_at) : undefined,
  };

  return transformedInvite as Optionalize<typeof transformedInvite>;
}

export interface Invite extends ReturnType<typeof transformInvite> {}
