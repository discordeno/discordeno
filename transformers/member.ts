import type { Bot } from "../bot.ts";
import { DiscordMember, DiscordUser, PartialDiscordUser } from "../types/discord.ts";
import { MemberToggles } from "./toggles/member.ts";
import { UserToggles } from "./toggles/user.ts";
import { Optionalize } from "../types/shared.ts";

export function transformUser(bot: Bot, payload: DiscordUser | PartialDiscordUser) {
  const user = {
    id: bot.transformers.snowflake(payload.id || ""),
    username: "username" in payload ? payload.username : undefined,
    discriminator: "discriminator" in payload ? payload.discriminator : undefined,
    avatar: "avatar" in payload ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    locale: "locale" in payload ? payload.locale : undefined,
    email: "email" in payload ? payload.email : undefined,
    flags: "flags" in payload ? payload.flags : undefined,
    premiumType: "premium_type" in payload ? payload.premium_type : undefined,
    publicFlags: "public_flags" in payload ? payload.public_flags : undefined,
    toggles: new UserToggles(payload),
  };

  return user as Optionalize<typeof user>;
}

export function transformMember(bot: Bot, payload: DiscordMember, guildId: bigint, userId: bigint) {
  const member = {
    id: userId,
    guildId,
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
