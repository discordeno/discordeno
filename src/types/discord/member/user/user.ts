import { DiscordBaseUser } from "./base.ts";
import { DiscordUserFlags } from "./flags.ts";
import { DiscordPremiumTypes } from "./premium.ts";

/** https://discord.com/developers/docs/resources/user#users-resource */
export interface DiscordUser extends DiscordBaseUser {
  /** the user's id */
  id: string;
  /** the user's username, not unique across the platform */
  username: string;
  /** the user's 4-digit discord-tag */
  discriminator: string;
  /** the user's avatar hash */
  avatar: string | null;
  /** whether the user belongs to an OAuth2 application */
  bot?: boolean;
  /** whether the user is an Official Discord System user (part of the urgent message system) */
  system?: boolean;
  /** whether the user has two factor enabled on their account */
  // deno-lint-ignore camelcase
  mfa_enabled?: boolean;
  /** the user's chosen language option */
  locale?: string;
  /** whether the email on this account has been verified */
  verified?: boolean;
  /** the user's email */
  email?: string | null;
  /** the flags on a user's account */
  flags?: DiscordUserFlags;
  /** the type of Nitro subscription on a user's account */
  // deno-lint-ignore camelcase
  premium_type?: DiscordPremiumTypes;
  /** the public flags on a user's account */
  // deno-lint-ignore camelcase
  public_flags?: DiscordUserFlags;
}
