import type { Bot } from "../bot.ts";
import { DiscordMember, DiscordUser } from "../types/discord.ts";
import { Optionalize } from "../types/shared.ts";
import { MemberToggles } from "./toggles/member.ts";
import { UserToggles } from "./toggles/user.ts";

export function transformUser(bot: Bot, payload: DiscordUser) {
  const user = {
    id: bot.transformers.snowflake(payload.id || ""),
    username: payload.username,
    discriminator: payload.discriminator,
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    locale: payload.locale,
    email: payload.email ?? undefined,
    flags: payload.flags,
    premiumType: payload.premium_type,
    publicFlags: payload.public_flags,
    toggles: new UserToggles(payload),
  };

  return user as Optionalize<typeof user>;
}

export function transformMember(bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint) {
  const member = {
    id: userId,
    guildId,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    nick: payload.nick ?? undefined,
    roles: payload.roles.map((id) => bot.transformers.snowflake(id)),
    joinedAt: Date.parse(payload.joined_at),
    premiumSince: payload.premium_since ? Date.parse(payload.premium_since) : undefined,
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    permissions: payload.permissions ? bot.transformers.snowflake(payload.permissions) : undefined,
    communicationDisabledUntil: payload.communication_disabled_until
      ? Date.parse(payload.communication_disabled_until)
      : undefined,
    toggles: new MemberToggles(payload),
  };

  return member as Optionalize<typeof member>;
}

export interface Member extends ReturnType<typeof transformMember> {}
export interface User extends ReturnType<typeof transformUser> {}
