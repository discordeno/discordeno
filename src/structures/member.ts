import { cacheHandlers } from "../controllers/cache.ts";
import { GuildMember, MemberCreatePayload } from "../types/member.ts";
import { Unpromise } from "../types/misc.ts";
import { Collection } from "../utils/collection.ts";

export async function createMember(data: MemberCreatePayload, guildID: string) {
  const {
    joined_at: joinedAt,
    premium_since: premiumSince,
    user: userData,
    ...rest
  } = data;

  const {
    mfa_enabled: mfaEnabled,
    premium_type: premiumType,
    ...user
  } = data.user || {};

  const cached = await cacheHandlers.get("members", user.id);
  if (cached) {
    // Check if any of the others need updating
    if (mfaEnabled) cached.mfaEnabled = mfaEnabled;
    if (premiumType) cached.premiumType = premiumType;
    if (user.username) cached.username = user.username;
    if (user.discriminator) cached.discriminator = user.discriminator;
    if (user.avatar) cached.avatar = user.avatar;
    if (user.bot) cached.bot = user.bot;
    if (user.system) cached.system = user.system;
    if (user.locale) cached.locale = user.locale;
    if (user.verified) cached.verified = user.verified;
    if (user.email) cached.email = user.email;
    if (user.flags) cached.flags = user.flags;

    // Set the guild data
    cached.guilds.set(guildID, {
      /** The user's guild nickname if one is set. */
      nick: data.nick,
      /** Array of role ids that the member has */
      roles: data.roles,
      /** When the user joined the guild. */
      joinedAt: Date.parse(joinedAt),
      /** When the user used their nitro boost on the server. */
      premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
      /** Whether the user is deafened in voice channels */
      deaf: data.deaf,
      /** Whether the user is muted in voice channels */
      mute: data.mute,
    });
  }

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

  member.guilds.set(guildID, {
    nick: data.nick,
    roles: data.roles,
    joinedAt: Date.parse(joinedAt),
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    deaf: data.deaf,
    mute: data.mute,
  });

  await cacheHandlers.set("members", member.id, member);

  return member;
}

export interface Member extends Unpromise<ReturnType<typeof createMember>> {}
