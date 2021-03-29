import { SnakeCaseProps } from "../util.ts";
import { DefaultMessageNotificationLevel } from "./default_message_notification_level.ts";
import { ExplicitContentFilterLevel } from "./explicit_content_filter_level.ts";
import { VerificationLevel } from "./verification_level.ts";

export interface ModifyGuildParams {
  /** Guild name */
  name?: string;
  /** Guild voice region id */
  region?: string | null;
  /** Verification level */
  verificationLevel?: VerificationLevel | null;
  /** Default message notification filter level */
  defaultMessageNotifications?: DefaultMessageNotificationLevel | null;
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevel | null;
  /** Id for afk channel */
  afkChannelId?: string | null;
  /** Afk timeout in seconds */
  afkTimeout?: number;
  /** Base64 1024x1024 png/jpeg/gif image for the guild icon (can be animated gif when the server has ANIMATEDICON feature) */
  icon?: string | null;
  /** User id to transfer guild ownershop to (must be owner) */
  ownerId?: string;
  /** Base64 16:9 png/jpeg image for the guild splash (when the server has INVITESPLASH feature) */
  splash?: string | null;
  /** Base64 16:9 png/jpeg image for the guild banner (when the server has BANNER feature) */
  banner?: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string | null;
  /** The id of the channel where Community guilds display rules and/or guidelines */
  rulesChannelId?: string | null;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId?: string | null;
  /** The preferred locale of a Community guild used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale?: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild */
export type DiscordModifyGuildParams = SnakeCaseProps<ModifyGuildParams>;
