import { MemberCreatePayload } from "../types/member.ts";
import { Guild } from "./guild.ts";
import { cache } from "../utils/cache.ts";

export const createMember = (data: MemberCreatePayload, guild: Guild) => {
  const member = {
    ...data,
    /** When the user joined the guild */
    joinedAt: Date.parse(data.joined_at),
    /** When the user used their nitro boost on the server. */
    premiumSince: data.premium_since
      ? Date.parse(data.premium_since)
      : undefined,
    /** The full username#discriminator */
    tag: `${data.user.username}#${data.user.discriminator}`,
    /** The user mention with nickname if possible */
    mention: `<@!${data.user.id}>`,
    /** The guild id where this member exists */
    guildID: guild.id,
    /** Whether or not this user has 2FA enabled. */
    mfaEnabled: data.user.mfa_enabled,
    /** The premium type for this user */
    premiumType: data.user.premium_type,

    /** Gets the guild object from cache for this member. This is a method instead of a prop to preserve memory. */
    guild: () => cache.guilds.get(guild.id)!,
  };

  // Remove excess properties to preserve cache.
  // delete member.joined_at;
  // delete member.premium_since;
  // delete member.user.mfa_enabled;
  // delete member.user.premium_type;

  return member;
};

export interface Member
  extends
    Omit<ReturnType<typeof createMember>, "joined_at" | "premium_since"> {}
