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
    results.map<[string, InviteMetadata]>((result) => {
      const inviteMetadata = {
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
        guildScheduledEvent: result.guild_scheduled_event
          ? bot.transformers.scheduledEvent(bot, result.guild_scheduled_event)
          : undefined,
        // Metadata structure
        uses: result.uses,
        maxUses: result.max_uses,
        maxAge: result.max_age,
        temporary: result.temporary,
        createdAt: Date.parse(result.created_at),
      };
      return [inviteMetadata.code, inviteMetadata];
    }),
  );
}
