import { Snowflake } from "./ids.ts";

/** https://discord.com/developers/docs/resources/user#user-object */
export interface User<T extends ("discord" | "lib") = "lib"> {
  /** The user's id */
  id: Snowflake<T>;
  /** The user's username, not unique across the platform */
  username: string;
  /** The user's 4-digit discord-tag */
  discriminator: T extends "discord" ? string : number;
  /** The user's avatar hash */
  avatar: T extends "discord" ? string | null : bigint | undefined;
  /** All the boolean toggles merged into bitwise for this object. */
  bits: T extends "discord" ? undefined : bigint;
  /** Whether the user belongs to an OAuth2 application */
  bot: T extends "discord" ? boolean | undefined : undefined;
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system: T extends "discord" ? boolean | undefined : undefined;
  /** Whether the user has two factor enabled on their account */
  mfa_enabled: T extends "discord" ? boolean | undefined : undefined;
  /** The user's chosen language option */
  locale?: string;
  /** Whether the email on this account has been verified */
  verified: T extends "discord" ? boolean | undefined : undefined;
  /** The user's email */
  email: T extends "discord" ? string | null : string | undefined;
  /** The flags on a user's account */
  flags?: UserFlags;
  /** The type of Nitro subscription on a user's account */
  premium_type?: PremiumTypes;
  /** The public flags on a user's account */
  public_flags?: UserFlags;
  /** the user's banner, or null if unset */
  banner?: string;
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accent_color?: number;
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
