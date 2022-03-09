import {
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  GuildFeatures,
  SystemChannelFlags,
} from "../shared.ts";
import { VerificationLevels } from "./verificationLevels.ts";

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
