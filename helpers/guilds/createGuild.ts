import type { Bot } from "../../bot.ts";
import { Channel } from "../../transformers/channel.ts";
import { Role } from "../../transformers/role.ts";
import { DiscordGuild } from "../../types/discord.ts";
import {
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  SystemChannelFlags,
  VerificationLevels,
} from "../../types/shared.ts";

/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
export async function createGuild(bot: Bot, options: CreateGuild) {
  const result = await bot.rest.runMethod<DiscordGuild>(bot.rest, "POST", bot.constants.routes.GUILDS(), {
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
    verification_level: options.verificationLevel,
  });

  return bot.transformers.guild(bot, { guild: result, shardId: 0 });
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
  /** Name of the guild (1-100 characters) */
  name: string;
  /** Base64 128x128 image for the guild icon */
  icon?: string;
  /** Verification level */
  verificationLevel?: VerificationLevels;
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels;
  /** New guild roles (first role is the everyone role) */
  roles?: Role[];
  /** New guild's channels */
  channels?: Partial<Channel>[];
  /** Id for afk channel */
  afkChannelId?: string;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string;
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags;
}
