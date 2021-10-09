import { Bot } from "../bot.ts";
import { GuildMemberWithUser } from "../types/members/guild_member.ts";
import { User } from "../types/users/user.ts";
import { SnakeCase, SnakeCasedPropertiesDeep } from "../types/util.ts";
import { iconHashToBigInt } from "../util/hash.ts";

export type DiscordenoUser = ReturnType<typeof transformUser>;

export function transformUser(bot: Bot, payload: SnakeCasedPropertiesDeep<User>) {
  return {
    id: BigInt(payload.id),
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar ? iconHashToBigInt(payload.avatar) : null,
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

export function transformMember(
  bot: Bot,
  // The `user` param in `DiscordGuildMember` is optional since discord does not send it in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events. But this data in there is required to build this structure so it is required in this case
  payload: SnakeCasedPropertiesDeep<GuildMemberWithUser>,
  guildId: bigint
) {
  // ADD USER TO CACHE
  const transformedUser = bot.transformers.user(bot, payload.user);
  // PULL USER FROM CACHE
  bot.users.set(transformedUser.id, transformedUser);

  return {
    user: bot.users.get(transformedUser.id),
    guildId,
    nick: payload.nick,
    roles: payload.roles.map((id) => BigInt(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
    deaf: payload.deaf,
    mute: payload.mute,
    pending: payload.pending,
  };
}

export interface DiscordenoMember extends Omit<User, "discriminator" | "id" | "avatar"> {
  /** The user's id */
  id: bigint;
  /** The user's 4-digit discord-tag */
  discriminator: number;
  /** The avatar in bigint format. */
  avatar: bigint;
  /** Holds all the boolean toggles. */
  bitfield: bigint;
  /** When the member has been cached the last time. */
  cachedAt: number;
}
