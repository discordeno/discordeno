import { cache, cacheHandlers } from "../cache.ts";
import { banMember } from "../helpers/members/ban_member.ts";
import { editMember } from "../helpers/members/edit_member.ts";
import { kickMember } from "../helpers/members/kick_member.ts";
import { rawAvatarURL } from "../helpers/members/raw_avatar_url.ts";
import { sendDirectMessage } from "../helpers/members/send_direct_message.ts";
import { addRole } from "../helpers/roles/add_role.ts";
import { removeRole } from "../helpers/roles/remove_role.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp } from "../util/utils.ts";
import { Guild } from "./guild.ts";

const baseMember: Partial<Member> = {
  get avatarURL() {
    return rawAvatarURL(this.id!, this.discriminator!, this.avatar!);
  },
  get mention() {
    return `<@!${this.id!}>`;
  },
  get tag() {
    return `${this.username!}#${this.discriminator!}`;
  },

  // METHODS
  makeAvatarURL(options) {
    return rawAvatarURL(
      this.id!,
      this.discriminator!,
      this.avatar!,
      options.size,
      options.format,
    );
  },
  guild(guildId) {
    return cache.guilds.get(guildId);
  },
  name(guildId) {
    return this.guildMember!(guildId)?.nick || this.username!;
  },
  guildMember(guildId) {
    return this.guilds?.get(guildId);
  },
  sendDM(content) {
    return sendDirectMessage(this.id!, content);
  },
  kick(guildId, reason) {
    return kickMember(guildId, this.id!, reason);
  },
  edit(guildId, options) {
    return editMember(guildId, this.id!, options);
  },
  ban(guildId, options) {
    return banMember(guildId, this.id!, options);
  },
  addRole(guildId, roleId, reason) {
    return addRole(guildId, this.id!, roleId, reason);
  },
  removeRole(guildId, roleId, reason) {
    return removeRole(guildId, this.id!, roleId, reason);
  },
};

export async function createMemberStruct(
  data: MemberCreatePayload,
  guildId: string,
) {
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

  const { mfa_enabled: mfaEnabled, premium_type: premiumType, ...user } =
    data.user || {};

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};

  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(rest[key]);
  }

  for (const key of Object.keys(user)) {
    // @ts-ignore index signature
    restProps[key] = createNewProp(user[key]);
  }

  const member = Object.create(baseMember, {
    ...restProps,
    mfaEnabled: createNewProp(mfaEnabled),
    premiumType: createNewProp(premiumType),
    /** The guild related data mapped by guild id */
    guilds: createNewProp(new Collection<string, GuildMember>()),
  });

  const cached = await cacheHandlers.get("members", user.id);
  if (cached) {
    for (const [id, guild] of cached.guilds.entries()) {
      member.guilds.set(id, guild);
    }
  }

  // User was never cached before
  member.guilds.set(guildId, {
    nick: nick,
    roles: roles,
    joinedAt: Date.parse(joinedAt),
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    deaf: deaf,
    mute: mute,
  });

  return member as Member;
}
