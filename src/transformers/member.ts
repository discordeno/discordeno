import type { Bot } from "../bot.ts";
import type { GuildMember } from "../types/members/guildMember.ts";
import type { SnakeCasedPropertiesDeep } from "../types/util.ts";

export function transformMember(
  bot: Bot,
  payload: SnakeCasedPropertiesDeep<GuildMember>,
  guildId: bigint,
  userId: bigint
): DiscordenoMember {
  return {
    id: userId,
    guildId,
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => BigInt(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
    deaf: payload.deaf,
    mute: payload.mute,
    pending: payload.pending,
    cachedAt: Date.now(),
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    permissions: payload.permissions ? bot.transformers.snowflake(payload.permissions) : undefined,
  };
}

export interface DiscordenoMember {
  /** The user's id */
  id: bigint;
  /** When the member has been cached the last time. */
  cachedAt: number;
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
}
