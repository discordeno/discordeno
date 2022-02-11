import { PremiumTypes } from "./premiumTypes.ts";
import { UserFlags } from "./userFlags.ts";

/** https://discord.com/developers/docs/resources/user#user-object */
export interface User {
  /** The user's id */
  id: string;
  /** The user's username, not unique across the platform */
  username: string;
  /** The user's 4-digit discord-tag */
  discriminator: string;
  /** The user's avatar hash */
  avatar: string | null;
  /** Whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** Whether the user has two factor enabled on their account */
  mfaEnabled?: boolean;
  /** The user's chosen language option */
  locale?: string;
  /** Whether the email on this account has been verified */
  verified?: boolean;
  /** The user's email */
  email?: string | null;
  /** The flags on a user's account */
  flags?: UserFlags;
  /** The type of Nitro subscription on a user's account */
  premiumType?: PremiumTypes;
  /** The public flags on a user's account */
  publicFlags?: UserFlags;
  /** the user's banner, or null if unset */
  banner?: string;
  /** the user's banner color encoded as an integer representation of hexadecimal color code */
  accent_color?: number;
}
