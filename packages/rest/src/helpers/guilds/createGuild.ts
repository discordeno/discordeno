import { routes } from '@discordeno/constant'
import type {
  DefaultMessageNotificationLevels,
  DiscordCreateGuild,
  DiscordGuild,
  ExplicitContentFilterLevels,
  SnakeToCamelCaseNested,
  SystemChannelFlags,
  VerificationLevels
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Channel } from '../../transformers/channel.js'
import type { Role } from '../../transformers/role.js'

/**
 * Creates a guild.
 *
 * @param rest - The rest manager to use to make the request.
 * @param options - The parameters for the creation of the guild.
 * @returns An instance of the created {@link DiscordGuild}.
 *
 * @remarks
 * ⚠️ This route can only be used by bots in __fewer than 10 guilds__.
 *
 * Fires a _Guild Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild}
 */
export async function createGuild (
  rest: RestManager,
  options: CreateGuild
): Promise<SnakeToCamelCaseNested<DiscordGuild>> {
  const result = await rest.runMethod<DiscordGuild>(
    rest,
    'POST',
    routes.GUILDS(),
    {
      name: options.name,
      afk_channel_id: options.afkChannelId,
      afk_timeout: options.afkTimeout,
      channels: options.channels,
      default_message_notifications: options.defaultMessageNotifications,
      explicit_content_filter: options.explicitContentFilter,
      icon: options.icon,
      roles: options.roles,
      system_channel_flags: options.systemChannelFlags,
      system_channel_id: options.systemChannelId,
      verification_level: options.verificationLevel
    } as DiscordCreateGuild
  )

  return {
    id: result.id,
    name: result.name,
    icon: result.icon,
    iconHash: result.icon_hash,
    splash: result.splash,
    discoverySplash: result.discovery_splash,
    ownerId: result.owner_id,
    afkChannelId: result.afk_channel_id,
    afkTimeout: result.afk_timeout,
    widgetEnabled: result.widget_enabled,
    widgetChannelId: result.widget_channel_id,
    verificationLevel: result.verification_level,
    defaultMessageNotifications: result.default_message_notifications,
    explicitContentFilter: result.explicit_content_filter,
    roles: result.roles.map((role) => ({
      id: role.id,
      name: role.name,
      color: role.color,
      hoist: role.hoist,
      icon: role.icon,
      unicodeEmoji: role.unicode_emoji,
      position: role.position,
      permissions: role.permissions,
      managed: role.managed,
      mentionable: role.mentionable,
      tags: role.tags && {
        botId: role.tags.bot_id,
        integrationId: role.tags.integration_id,
        premiumSubscriber: role.tags.premium_subscriber
      }
    })),
    emojis: result.emojis,
    features: result.features,
    mfaLevel: result.mfa_level,
    applicationId: result.application_id,
    systemChannelId: result.system_channel_id,
    systemChannelFlags: result.system_channel_flags,
    rulesChannelId: result.rules_channel_id,
    maxPresences: result.max_presences,
    maxMembers: result.max_members,
    vanityUrlCode: result.vanity_url_code,
    description: result.description,
    banner: result.banner,
    premiumTier: result.premium_tier,
    premiumSubscriptionCount: result.premium_subscription_count,
    preferredLocale: result.preferred_locale,
    publicUpdatesChannelId: result.public_updates_channel_id,
    maxVideoChannelUsers: result.max_video_channel_users,
    approximateMemberCount: result.approximate_member_count,
    approximatePresenceCount: result.approximate_presence_count,
    welcomeScreen: result.welcome_screen && {
      description: result.welcome_screen.description,
      welcomeChannels: result.welcome_screen.welcome_channels.map(
        (welcomeScreenChannel) => ({
          channelId: welcomeScreenChannel.channel_id,
          description: welcomeScreenChannel.description,
          emojiId: welcomeScreenChannel.emoji_id,
          emojiName: welcomeScreenChannel.emoji_name
        })
      )
    },
    nsfwLevel: result.nsfw_level,
    stickers: result.stickers?.map((sticker) => ({
      id: sticker.id,
      packId: sticker.pack_id,
      name: sticker.name,
      description: sticker.description,
      tags: sticker.tags,
      type: sticker.type,
      formatType: sticker.format_type,
      available: sticker.available,
      guildId: sticker.guild_id,
      user: sticker.user && {
        id: sticker.user.id,
        username: sticker.user.username,
        discriminator: sticker.user.discriminator,
        avatar: sticker.user.avatar,
        bot: sticker.user.bot,
        system: sticker.user.system,
        mfaEnabled: sticker.user.mfa_enabled,
        banner: sticker.user.banner,
        accentColor: sticker.user.accent_color,
        locale: sticker.user.locale,
        verified: sticker.user.verified,
        email: sticker.user.email,
        flags: sticker.user.flags,
        premiumType: sticker.user.premium_type,
        publicFlags: sticker.user.public_flags
      },
      sortValue: sticker.sort_value
    })),
    premiumProgressBarEnabled: result.premium_progress_bar_enabled
  }
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
  /** Name of the guild (1-100 characters) */
  name: string
  /** Base64 128x128 image for the guild icon */
  icon?: string
  /** Verification level */
  verificationLevel?: VerificationLevels
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels
  /** New guild roles (first role is the everyone role) */
  roles?: Role[]
  /** New guild's channels */
  channels?: Array<Partial<Channel>>
  /** Id for afk channel */
  afkChannelId?: string
  /** Afk timeout in seconds */
  afkTimeout?: number
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags
}
