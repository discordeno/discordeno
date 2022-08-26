import type { Bot } from "../../bot.ts";
import { TargetTypes } from "../../mod.ts";
import { DiscordInviteMetadata } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";
import { InviteMetadata } from "./getInvite.ts";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(bot: Bot, guildId: bigint): Promise<Collection<string, InviteMetadata>> {
  const results = await bot.rest.runMethod<DiscordInviteMetadata[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INVITES(guildId),
  );

  return new Collection(
    results.map<[string, InviteMetadata]>((invite) => {
      const inviteMetadata = {
        code: invite.code,
        guildId: invite.guild?.id ? bot.transformers.snowflake(invite.guild.id) : undefined,
        channelId: invite.channel?.id ? bot.transformers.snowflake(invite.channel.id) : undefined,
        inviter: invite.inviter ? bot.transformers.user(bot, invite.inviter) : undefined,
        targetType: invite.target_type
          ? (invite.target_type === 1 ? TargetTypes.Stream : TargetTypes.EmbeddedApplication)
          : undefined,
        targetUser: invite.target_user ? bot.transformers.user(bot, invite.target_user) : undefined,
        targetApplicationId: invite.target_application?.id
          ? bot.transformers.snowflake(invite.target_application.id)
          : undefined,
        approximatePresenceCount: invite.approximate_presence_count,
        approximateMemberCount: invite.approximate_member_count,
        expiresAt: invite.expires_at ? Date.parse(invite.expires_at) : undefined,
        guildScheduledEvent: invite.guild_scheduled_event
          ? bot.transformers.scheduledEvent(bot, invite.guild_scheduled_event)
          : undefined,
        // Metadata structure
        uses: invite.uses,
        maxUses: invite.max_uses,
        maxAge: invite.max_age,
        temporary: invite.temporary,
        createdAt: Date.parse(invite.created_at),
      };
      return [inviteMetadata.code, inviteMetadata];
    }),
  );
}
