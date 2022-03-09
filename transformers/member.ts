import type { Bot } from "../bot.ts";
import { DiscordMember, DiscordUser } from "../types/discord.ts";
import { Member, User } from "../types/discordeno.ts";
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

export function transformUser(bot: Bot, payload: DiscordUser): User {
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
): Member {
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

export interface DiscordenoMember {
  /** The user's id */
  id: bigint;
  /** The guild id where this member exists */
  guildId: bigint;
  /** The nickname for this member in this server */
  nick?: string;
  /** The role ids this user has */
  roles: bigint[];
  /** When this member joined */
  joinedAt: number;
  /** When this member began boosting this server if this member is boosting the server. */
  premiumSince?: number;
  /** Whether or not the member is deafened. */
  deaf?: boolean;
  /** Whether or not the member is muted. */
  mute?: boolean;
  /** Whether or not this member is pending in server verification. */
  pending?: boolean;
  /** The members avatar for this server. */
  avatar?: bigint;
  /** The permissions this member has in the guild. Only present on interaction events. */
  permissions?: bigint;
  /** when the user's timeout will expire and the user will be able to communicate in the guild again, undefined or a time in the past if the user is not timed out */
  communicationDisabledUntil?: number;
}
