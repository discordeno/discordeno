import type { Bot } from "../../bot.ts";
import { DiscordGuild } from "../../types/discord.ts";
import {
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  GuildFeatures,
  SystemChannelFlags,
  VerificationLevels,
} from "../../types/shared.ts";

/** Modify a guilds settings. Requires the MANAGE_GUILD permission. */
export async function editGuild(bot: Bot, guildId: bigint, options: ModifyGuild, shardId: number) {
  if (options.icon && !options.icon.startsWith("data:image/")) {
    options.icon = await bot.utils.urlToBase64(options.icon);
  }

  if (options.banner && !options.banner.startsWith("data:image/")) {
    options.banner = await bot.utils.urlToBase64(options.banner);
  }

  if (options.splash && !options.splash.startsWith("data:image/")) {
    options.splash = await bot.utils.urlToBase64(options.splash);
  }

  const result = await bot.rest.runMethod<DiscordGuild>(
    bot.rest,
    "PATCH",
    bot.constants.routes.GUILD(guildId),
    {
      name: options.name,
      verification_levels: options.verificationLevel,
      default_message_notifications: options.defaultMessageNotifications,
      explicit_content_filter: options.explicitContentFilter,
      afk_channel_id: options.afkChannelId ? options.afkChannelId.toString() : options.afkChannelId,
      afk_timeout: options.afkTimeout,
      icon: options.icon,
      owner_id: options.ownerId ? options.ownerId.toString() : options.ownerId,
      splash: options.splash,
      discovery_splash: options.discoverySplash,
      banner: options.banner,
      system_channel_id: options.systemChannelId ? options.systemChannelId.toString() : options.systemChannelId,
      system_channel_flags: options.systemChannelFlags,
      rules_channel_id: options.rulesChannelId ? options.rulesChannelId.toString() : options.rulesChannelId,
      public_updates_channel_id: options.publicUpdatesChannelId
        ? options.publicUpdatesChannelId.toString()
        : options.publicUpdatesChannelId,
      preferred_locale: options.preferredLocale,
      features: options.features,
      premium_progress_bar_enabled: options.premiumProgressBarEnabled,
    },
  );

  return bot.transformers.guild(bot, {
    guild: result,
    shardId,
  });
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export interface ModifyGuild {
  /** Guild name */
  name?: string;
  /** Verification level */
  verificationLevel?: VerificationLevels | null;
  /** Default message notification filter level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels | null;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels | null;
  /** Id for afk channel */
  afkChannelId?: bigint | null;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has the `ANIMATED_ICON` feature) */
  icon?: string | null;
  /** User id to transfer guild ownership to (must be owner) */
  ownerId?: bigint;
  /** Base64 16:9 png/jpeg image for the guild splash (when the server has `INVITE_SPLASH` feature) */
  splash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild discovery spash (when the server has the `DISCOVERABLE` feature) */
  discoverySplash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: bigint | null;
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags;
  /** The id of the channel where Community guilds display rules and/or guidelines */
  rulesChannelId?: bigint | null;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: bigint | null;
  /** The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale?: string | null;
  /** Enabled guild features */
  features?: GuildFeatures[];
  /** Whether the guild's boost progress bar should be enabled */
  premiumProgressBarEnabled?: boolean;
}
