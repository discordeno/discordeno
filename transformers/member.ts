import type { Bot } from "../bot.ts";
import { DiscordMember, DiscordUser } from "../types/discord.ts";
import { PremiumTypes, UserFlags } from "../types/shared.ts";
import { MemberToggles } from "./toggles/member.ts";
import { UserToggles } from "./toggles/user.ts";

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

export function transformUser(bot: Bot, payload: DiscordUser) {
  return {
    id: bot.transformers.snowflake(payload.id || ""),
    username: payload.username,
    discriminator: Number(payload.discriminator),
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags,
    toggles: new UserToggles(payload),
  };
}

export function transformMember(
  bot: Bot,
  payload: DiscordMember,
  guildId: bigint,
  userId: bigint,
) {
  return {
    id: userId,
    guildId,
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => BigInt(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    permissions: payload.permissions ? bot.transformers.snowflake(payload.permissions) : undefined,
    communicationDisabledUntil: payload.communication_disabled_until
      ? Date.parse(payload.communication_disabled_until)
      : undefined,
    toggles: new MemberToggles(payload),
  };
}

export interface Member extends ReturnType<typeof transformMember> {}
export interface User extends ReturnType<typeof transformUser> {}
