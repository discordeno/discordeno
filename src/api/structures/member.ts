import {
  BanOptions,
  EditMemberOptions,
  GuildMember,
  ImageFormats,
  ImageSize,
  MemberCreatePayload,
  MessageContent,
} from "../../types/mod.ts";
import { cache } from "../../util/cache.ts";
import { Collection } from "../../util/collection.ts";
import { createNewProp } from "../../util/utils.ts";
import { cacheHandlers } from "../controllers/cache.ts";
import { ban } from "../handlers/guild.ts";
import {
  addRole,
  editMember,
  kick,
  rawAvatarURL,
  removeRole,
  sendDirectMessage,
} from "../handlers/member.ts";
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
  guild(guildID) {
    return cache.guilds.get(guildID);
  },
  name(guildID) {
    return this.guildMember!(guildID)?.nick || this.username!;
  },
  guildMember(guildID) {
    return this.guilds?.get(guildID);
  },
  sendDM(content) {
    return sendDirectMessage(this.id!, content);
  },
  kick(guildID, reason) {
    return kick(guildID, this.id!, reason);
  },
  edit(guildID, options) {
    return editMember(guildID, this.id!, options);
  },
  ban(guildID, options) {
    return ban(guildID, this.id!, options);
  },
  addRole(guildID, roleID, reason) {
    return addRole(guildID, this.id!, roleID, reason);
  },
  removeRole(guildID, roleID, reason) {
    return removeRole(guildID, this.id!, roleID, reason);
  },
};

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
  member.guilds.set(guildID, {
    nick: nick,
    roles: roles,
    joinedAt: Date.parse(joinedAt),
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    deaf: deaf,
    mute: mute,
  });

  return member as Member;
}

