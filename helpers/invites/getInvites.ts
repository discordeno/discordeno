import type { Bot } from "../../bot.ts";
import { DiscordInviteMetadata } from "../../types/discord.ts";
import { Collection } from "../../util/collection.ts";

/** Get all the invites for this guild. Requires MANAGE_GUILD permission */
export async function getInvites(bot: Bot, guildId: bigint) {
  const result = await bot.rest.runMethod<DiscordInviteMetadata[]>(
    bot.rest,
    "GET",
    bot.constants.routes.GUILD_INVITES(guildId),
  );

  return new Collection(
    result.map((invite) => [
      invite.code,
      {
        code: invite.code,
        type: invite.target_type,
        expiresAt: invite.expires_at ? Date.parse(invite.expires_at) : undefined,
        guild: invite.guild
          ? {
            id: bot.transformers.snowflake(invite.guild.id!),
            name: invite.guild.name,
            splash: invite.guild.splash ? bot.utils.iconHashToBigInt(invite.guild.splash) : undefined,
            banner: invite.guild.banner ? bot.utils.iconHashToBigInt(invite.guild.banner) : undefined,
            icon: invite.guild.icon ? bot.utils.iconHashToBigInt(invite.guild.icon) : undefined,
            description: invite.guild.description,
            features: invite.guild.features,
            verificationLevel: invite.guild.verification_level,
            vanityUrlCode: invite.guild.vanity_url_code,
            premiumSubscriptionCount: invite.guild.premium_subscription_count,
            nsfw_level: invite.guild.nsfw_level,
            welcomeScreen: invite.guild.welcome_screen
              ? {
                description: invite.guild.welcome_screen.description,
                channels: invite.guild.welcome_screen.welcome_channels.map((channel) => ({
                  id: bot.transformers.snowflake(channel.channel_id),
                  description: channel.description,
                  emoji: {
                    id: channel.emoji_id ? bot.transformers.snowflake(channel.emoji_id) : undefined,
                    name: channel.emoji_name,
                  },
                })),
              }
              : undefined,
          }
          : undefined,
        channel: invite.channel
          ? {
            id: bot.transformers.snowflake(invite.channel.id!),
            name: invite.channel.name,
            type: invite.channel.type,
          }
          : undefined,
        inviter: invite.inviter
          ? {
            id: bot.transformers.snowflake(invite.inviter.id),
            username: invite.inviter.username,
            avatar: invite.inviter.avatar ? bot.utils.iconHashToBigInt(invite.inviter.avatar) : undefined,
            // avatarDecoration: invite.inviter.avatar_decoration
            // ? bot.utils.iconHashToBigInt(invite.inviter.avatar_decoration)
            // : undefined,
            discriminator: invite.inviter.discriminator,
            publicFlags: invite.inviter.public_flags,
          }
          : undefined,
        // Metadata structure
        uses: invite.uses,
        maxUses: invite.max_uses,
        maxAge: invite.max_age,
        temporary: invite.temporary,
        createdAt: Date.parse(invite.created_at),
      },
    ]),
  );
}
