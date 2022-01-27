export interface User {
  /** The user's id */
  id: bigint;
  /** The user's username, not unique across the platform */
  username: string;
  /** The user's 4-digit discord-tag */
  discriminator: number;
  /** The user's avatar hash */
  avatar?: bigint;
  /** The user's chosen language option */
  locale?: string;
  /** The flags on a user's account */
  flags?: UserFlags;
  /** The type of Nitro subscription on a user's account */
  premiumType?: PremiumTypes;
  /** The public flags on a user's account */
  publicFlags?: UserFlags;
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accentColor?: number;
  /** The user's email */
  email?: string;
  /** The user's banner hash */
  banner?: bigint;
  /** The bits making up all the boolean toggles on this object. */
  bitfield: bigint;
}

/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export enum UserFlags {
  None,
  DiscordEmployee = 1 << 0,
  ParteneredServerOwner = 1 << 1,
  HypeSquadEvents = 1 << 2,
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
}

/** https://discord.com/developers/docs/resources/user#user-object-premium-types */
export enum PremiumTypes {
  None,
  NitroClassic,
  Nitro,
}
