import type { Bot } from "../bot.ts";
import type { PremiumTypes } from "../types/users/premiumTypes.ts";
import type { User } from "../types/users/user.ts";
import type { UserFlags } from "../types/users/userFlags.ts";
import type { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformUser(bot: Bot, payload: SnakeCasedPropertiesDeep<User>): DiscordenoUser {
  return {
    id: bot.transformers.snowflake(payload.id || ""),
    username: payload.username,
    discriminator: Number(payload.discriminator),
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    bot: payload.bot,
    system: payload.system,
    locale: payload.locale,
    verified: payload.verified,
    email: payload.email,
    flags: payload.flags,
    mfaEnabled: payload.mfa_enabled,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags,
  };
}

export interface DiscordenoUser {
  id: bigint;
  username: string;
  discriminator: number;
  avatar?: bigint;
  bot?: boolean;
  system?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: UserFlags;
  mfaEnabled?: boolean;
  premiumType?: PremiumTypes;
  publicFlags?: UserFlags;
}
