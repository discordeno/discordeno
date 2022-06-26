import { DiscordUser, PremiumTypes } from "../../deps.ts";
import Client from "../Client.ts";
import User from "./User.ts";

export class ExtendedUser extends User {
  email?: string | null;
  verified?: boolean;
  mfaEnabled?: boolean;
  premiumType?: PremiumTypes;

  constructor(data: DiscordUser, client: Client) {
    super(data, client);
    this.update(data);
  }

  update(data: DiscordUser) {
    super.update(data);
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.verified !== undefined) {
      this.verified = data.verified;
    }
    if (data.mfa_enabled !== undefined) {
      this.mfaEnabled = data.mfa_enabled;
    }
    if (data.premium_type !== undefined) {
      this.premiumType = data.premium_type;
    }
  }

  toJSON(props: string[] = []) {
    return super.toJSON([
      "email",
      "mfaEnabled",
      "premium",
      "verified",
      ...props,
    ]);
  }
}

export default ExtendedUser;
