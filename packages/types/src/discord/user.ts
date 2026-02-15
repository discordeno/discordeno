/** Types for: https://docs.discord.com/developers/resources/user */

import type { DiscordIntegration } from './guild.js';

/** https://docs.discord.com/developers/resources/user#user-object-user-structure */
export interface DiscordUser {
  /** The user's id */
  id: string;
  /** The user's username, not unique across the platform */
  username: string;
  /** The user's discord-tag */
  discriminator: string;
  /** The user's display name, if it is set. For bots, this is the application name */
  global_name: string | null;
  /** The user's avatar hash */
  avatar: string | null;
  /** Whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** Whether the user has two factor enabled on their account */
  mfa_enabled?: boolean;
  /** the user's banner, or null if unset */
  banner?: string | null;
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accent_color?: number | null;
  /** The user's chosen language option */
  locale?: string;
  /** Whether the email on this account has been verified */
  verified?: boolean;
  /** The user's email */
  email?: string | null;
  /** The flags on a user's account */
  flags?: number;
  /** The type of Nitro subscription on a user's account */
  premium_type?: PremiumTypes;
  /** The public flags on a user's account */
  public_flags?: number;
  /** data for the user's avatar decoration */
  avatar_decoration_data?: DiscordAvatarDecorationData | null;
  /** data for the user's collectibles */
  collectibles?: DiscordCollectibles | null;
  /** The user's primary guild */
  primary_guild?: DiscordUserPrimaryGuild | null;
}

/** https://docs.discord.com/developers/resources/user#user-object-user-flags */
export enum UserFlags {
  DiscordEmployee = 1 << 0,
  PartneredServerOwner = 1 << 1,
  HypeSquadEventsMember = 1 << 2,
  BugHunterLevel1 = 1 << 3,
  HouseBravery = 1 << 6,
  HouseBrilliance = 1 << 7,
  HouseBalance = 1 << 8,
  EarlySupporter = 1 << 9,
  TeamUser = 1 << 10,
  BugHunterLevel2 = 1 << 14,
  VerifiedBot = 1 << 16,
  EarlyVerifiedBotDeveloper = 1 << 17,
  DiscordCertifiedModerator = 1 << 18,
  BotHttpInteractions = 1 << 19,
  ActiveDeveloper = 1 << 22,
}

/** https://docs.discord.com/developers/resources/user#user-object-premium-types */
export enum PremiumTypes {
  None,
  NitroClassic,
  Nitro,
  NitroBasic,
}

/** https://docs.discord.com/developers/resources/user#user-object-user-primary-guild */
export interface DiscordUserPrimaryGuild {
  /** The id of the primary guild */
  identity_guild_id: string | null;
  /**
   * Whether the user is displaying the primary guild's server tag.
   *
   * @remarks
   * This can be `null` if the system clears the identity, e.g. because the server no longer supports tags.
   * This will be `false` if the user manually removes their tag.
   */
  identity_enabled: boolean | null;
  /** The text of the user's server tag. Limited to 4 characters */
  tag: string | null;
  /** The server tag badge hash */
  badge: string | null;
}

/** https://docs.discord.com/developers/resources/user#avatar-decoration-data-object-avatar-decoration-data-structure */
export interface DiscordAvatarDecorationData {
  /** the avatar decoration hash */
  asset: string;
  /** id of the avatar decoration's SKU */
  sku_id: string;
}

/** https://docs.discord.com/developers/resources/user#collectibles-collectible-structure */
export interface DiscordCollectibles {
  /** object mapping of nameplate data */
  nameplate?: DiscordNameplate;
}

/** https://docs.discord.com/developers/resources/user#nameplate-nameplate-structure */
export interface DiscordNameplate {
  /** the nameplate's id */
  sku_id: string;
  /** path to the nameplate asset */
  asset: string;
  /** the label of this nameplate. Currently unused */
  label: string;
  /** background color of the nameplate, one of: `crimson`, `berry`, `sky`, `teal`, `forest`, `bubble_gum`, `violet`, `cobalt`, `clover`, `lemon`, `white` */
  palette: string;
}

/** https://docs.discord.com/developers/resources/user#connection-object-connection-structure */
export interface DiscordConnection {
  /** id of the connection account */
  id: string;
  /** the username of the connection account */
  name: string;
  /** the service of this connection */
  type: DiscordConnectionServiceType;
  /** whether the connection is revoked */
  revoked?: boolean;
  /** an array of partial server integrations */
  integrations?: Partial<DiscordIntegration>[];
  /** whether the connection is verified */
  verified: boolean;
  /** whether friend sync is enabled for this connection */
  friend_sync: boolean;
  /** whether activities related to this connection will be shown in presence updates */
  show_activity: boolean;
  /** whether this connection has a corresponding third party OAuth2 token */
  two_way_link: boolean;
  /** visibility of this connection */
  visibility: DiscordConnectionVisibility;
}

/** https://docs.discord.com/developers/resources/user#connection-object-services */
export enum DiscordConnectionServiceType {
  AmazonMusic = 'amazon-music',
  BattleNet = 'battlenet',
  Bungie = 'bungie',
  Bluesky = 'bluesky',
  Crunchyroll = 'crunchyroll',
  Domain = 'domain',
  eBay = 'ebay',
  EpicGames = 'epicgames',
  Facebook = 'facebook',
  GitHub = 'github',
  Instagram = 'instagram',
  LeagueOfLegends = 'leagueoflegends',
  Mastodon = 'mastodon',
  PayPal = 'paypal',
  PlayStationNetwork = 'playstation',
  Reddit = 'reddit',
  RiotGames = 'riotgames',
  Roblox = 'roblox',
  Spotify = 'spotify',
  Skype = 'skype',
  Steam = 'steam',
  TikTok = 'tiktok',
  Twitch = 'twitch',
  Twitter = 'twitter',
  Xbox = 'xbox',
  YouTube = 'youtube',
}

/** https://docs.discord.com/developers/resources/user#connection-object-visibility-types */
export enum DiscordConnectionVisibility {
  /** invisible to everyone except the user themselves */
  None = 0,
  /** visible to everyone */
  Everyone = 1,
}

/** https://docs.discord.com/developers/resources/user#application-role-connection-object-application-role-connection-structure */
export interface DiscordApplicationRoleConnection {
  /** the vanity name of the platform a bot has connected (max 50 characters) */
  platform_name: string | null;
  /** the username on the platform a bot has connected (max 100 characters) */
  platform_username: string | null;
  /** object mapping application role connection metadata keys to their stringified value (max 100 characters) for the user on the platform a bot has connected */
  metadata: Record<string, string>;
}
