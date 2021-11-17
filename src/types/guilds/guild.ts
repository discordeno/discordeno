import { PresenceUpdate } from "../activity/presenceUpdate.ts";
import { Channel } from "../channels/channel.ts";
import { Emoji } from "../emojis/emoji.ts";
import { GuildMember } from "../members/guildMember.ts";
import { Role } from "../permissions/role.ts";
import { VoiceState } from "../voice/voiceState.ts";
import { DefaultMessageNotificationLevels } from "./defaultMessageNotificationLevels.ts";
import { ExplicitContentFilterLevels } from "./explicitContentFilterLevels.ts";
import { GuildFeatures } from "./guildFeatures.ts";
import { MfaLevels } from "./mfaLevels.ts";
import { PremiumTiers } from "./premiumTiers.ts";
import { SystemChannelFlags } from "./systemChannelFlags.ts";
import { VerificationLevels } from "./verificationLevels.ts";
import { WelcomeScreen } from "./welcomeScreen.ts";
import type { StageInstance } from "../channels/stageInstance.ts";
import { GuildNsfwLevel } from "./guildNsfwLevel.ts";

/** https://discord.com/developers/docs/resources/guild#guild-object */
export interface Guild {
  /** Guild id */
  id: string;
  /** Guild name (2-100 characaters, excluding trailing and leading whitespace) */
  name: string;
  /** Icon hash */
  icon: string | null;
  /** Icon hash, returned when in the template object */
  iconHash?: string | null;
  /** Splash hash */
  splash: string | null;
  /** Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature */
  discoverySplash: string | null;
  /** True if the user is the owner of the guild */
  owner?: boolean;
  /** Id of the owner */
  ownerId: string;
  /** Total permissions for the user in the guild (excludes overwrites) */
  permissions?: string;
  /** Id of afk channel */
  afkChannelId: string | null;
  /** Afk timeout in seconds */
  afkTimeout: number;
  /** True if the server widget is enabled */
  widgetEnabled?: boolean;
  /** The channel id that the widget will generate an invite to, or null if set to no invite */
  widgetChannelId?: string | null;
  /** Verification level required for the guild */
  verificationLevel: VerificationLevels;
  /** Default message notifications level */
  defaultMessageNotifications: DefaultMessageNotificationLevels;
  /** Explicit content filter level */
  explicitContentFilter: ExplicitContentFilterLevels;
  /** Roles in the guild */
  roles: Role[];
  /** Custom guild emojis */
  emojis: Emoji[];
  /** Enabled guild features */
  features: GuildFeatures[];
  /** Required MFA level for the guild */
  mfaLevel: MfaLevels;
  /** Application id of the guild creator if it is bot-created */
  applicationId: string | null;
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId: string | null;
  /** System channel flags */
  systemChannelFlags: SystemChannelFlags;
  /** The id of the channel where community guilds can display rules and/or guidelines */
  rulesChannelId: string | null;
  /** When this guild was joined at */
  joinedAt?: string;
  /** True if this is considered a large guild */
  large?: boolean;
  /** True if this guild is unavailable due to an outage */
  unavailable?: boolean;
  /** Total number of members in this guild */
  memberCount?: number;
  /** States of members currently in voice channels; lacks the guild_id key */
  voiceStates?: Omit<VoiceState, "guildId">[];
  /** Users in the guild */
  members?: GuildMember[];
  /** Channels in the guild */
  channels?: Channel[];
  // TODO: check if need to omit
  /** All active threads in the guild that the current user has permission to view */
  threads?: Channel[];
  /** Presences of the members in the guild, will only include non-offline members if the size is greater than large threshold */
  presences?: Partial<PresenceUpdate>[];
  /** The maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned) */
  maxPresences?: number | null;
  /** The maximum number of members for the guild */
  maxMembers?: number;
  /** The vaniy url code for the guild */
  vanityUrlCode: string | null;
  /** The description of a Community guild */
  description: string | null;
  /** Banner hash */
  banner: string | null;
  /** Premium tier (Server Boost level) */
  premiumTier: PremiumTiers;
  /** The number of boosts this guild currently has */
  premiumSubscriptionCount?: number;
  /** The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US" */
  preferredLocale: string;
  /** The id of the channel where admins and moderators of Community guilds receive notices from Discord */
  publicUpdatesChannelId: string | null;
  /** The maximum amount of users in a video channel */
  maxVideoChannelUsers?: number;
  /** Approximate number of members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximateMemberCount?: number;
  /**	Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> endpoint when with_counts is true */
  approximatePresenceCount?: number;
  /** The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object */
  welcomeScreen?: WelcomeScreen;
  /** Guild NSFW level */
  nsfwLevel: GuildNsfwLevel;
  /** Stage instances in the guild */
  stageInstances?: StageInstance[];
}
