import { DiscordUser } from "../../types/discord.ts";
import { ToggleBitfield } from "./ToggleBitfield.ts";

export const UserToggle = {
  /** Whether the user belongs to an OAuth2 application */
  bot: 1 << 0,
  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  system: 1 << 1,
  /** Whether the user has two factor enabled on their account */
  mfaEnabled: 1 << 2,
  /** Whether the email on this account has been verified */
  verified: 1 << 3,
};

export class UserToggles extends ToggleBitfield {
  constructor(user: DiscordUser) {
    super();

    if (user.bot) this.add(UserToggle.bot);
    if (user.system) this.add(UserToggle.system);
    if (user.mfa_enabled) this.add(UserToggle.mfaEnabled);
    if (user.verified) this.add(UserToggle.verified);
  }

  /** Whether the user belongs to an OAuth2 application */
  get bot() {
    return this.has("bot");
  }

  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  get system() {
    return this.has("system");
  }

  /** Whether the user has two factor enabled on their account */
  get mfaEnabled() {
    return this.has("mfaEnabled");
  }

  /** Whether the email on this account has been verified */
  get verified() {
    return this.has("verified");
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: UserToggleKeys | UserToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(UserToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= UserToggle[b]), 0));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(UserToggle)) {
      json[key] = super.contains(value);
    }

    return json as Record<UserToggleKeys, boolean>;
  }
}

export type UserToggleKeys = keyof typeof UserToggle;
