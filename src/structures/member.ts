import { MemberCreatePayload } from "../types/member.ts";

export function createMember(data: MemberCreatePayload, guildID: string) {
  const {
    joined_at: joinedAt,
    premium_since: premiumSince,
    ...rest
  } = data;

  const {
    mfa_enabled: mfaEnabled,
    premium_type: premiumType,
    ...user
  } = data.user;

  const member = {
    ...rest,
    // Only use those that we have not removed above
    user: user,
    /** When the user joined the guild */
    joinedAt: Date.parse(joinedAt),
    /** When the user used their nitro boost on the server. */
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    /** The full username#discriminator */
    tag: `${data.user.username}#${data.user.discriminator}`,
    /** The user mention with nickname if possible */
    mention: `<@!${data.user.id}>`,
    /** The guild id where this member exists */
    guildID,
    /** Whether or not this user has 2FA enabled. */
    mfaEnabled,
    /** The premium type for this user */
    premiumType,
  };

  return member;
}

export interface Member extends ReturnType<typeof createMember> {}
