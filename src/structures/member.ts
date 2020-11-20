import { cacheHandlers } from "../controllers/cache.ts";
import { GuildMember, MemberCreatePayload } from "../types/member.ts";
import { Unpromise } from "../types/misc.ts";
import { Collection } from "../utils/collection.ts";

export async function createMember(data: MemberCreatePayload, guildID: string) {
  const {
    joined_at: joinedAt,
    premium_since: premiumSince,
    user: userData,
    roles,
    deaf,
    mute,
    nick,
    ...rest
  } = data;

  const {
    mfa_enabled: mfaEnabled,
    premium_type: premiumType,
    ...user
  } = data.user || {};

  const member = {
    ...rest,
    // Only use those that we have not removed above
    ...user,
    /** Whether or not this user has 2FA enabled. */
    mfaEnabled,
    /** The premium type for this user */
    premiumType,
    /** The guild related data mapped by guild id */
    guilds: new Collection<string, GuildMember>(),
  };

  const cached = await cacheHandlers.get("members", user.id);
  if (cached) {
    for (const [id, guild] of cached.guilds.entries()) {
      member.guilds.set(id, guild)
    }
  }

  // User was never cached before
  member.guilds.set(guildID, {
    nick: nick,
    roles: roles,
    joinedAt: Date.parse(joinedAt),
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    deaf: deaf,
    mute: mute,
  });

  await cacheHandlers.set("members", member.id, member);

  return member;
}

export interface Member extends Unpromise<ReturnType<typeof createMember>> {}
