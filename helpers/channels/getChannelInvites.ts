import type { Bot } from "../../bot.ts";
import { DiscordInviteMetadata } from "../../types/discord.ts";
import { BigString, TargetTypes } from "../../types/shared.ts";
import { Collection } from "../../util/collection.ts";
import { InviteMetadata } from "../guilds/invites/mod.ts";

/**
 * Gets the list of invites for a channel.
 *
 * @param bot - The bot instance to use to make the request.
 * @param channelId - The ID of the channel to get the invites of.
 * @returns A collection of {@link InviteMetadata} objects assorted by invite code.
 *
 * @remarks
 * Requires the `MANAGE_CHANNELS` permission.
 *
 * Only usable for guild channels.
 *
 * @see {@link https://discord.com/developers/docs/resources/channel#get-channel-invites}
 */
export async function getChannelInvites(bot: Bot, channelId: BigString): Promise<Collection<string, InviteMetadata>> {
  const results = await bot.rest.runMethod<DiscordInviteMetadata[]>(
    bot.rest,
    "GET",
    bot.constants.routes.CHANNEL_INVITES(channelId),
  );

  return new Collection(
    results.map<[string, InviteMetadata]>((result) => {
      const invite = {
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
      return [invite.code, invite];
    }),
  );
}
