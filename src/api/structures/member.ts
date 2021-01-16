import { GuildMemberPayload } from "../../../mod.ts";
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
import {
  BanOptions,
  EditGuildMemberOptions,
  GuildMember,
  ImageFormats,
  ImageSize,
  MessageContent,
  ValueOf,
} from "../types/mod.ts";
import { Guild } from "./guild.ts";

const baseMember: Partial<Member> = {
  get avatarURL() {
    return rawAvatarURL(
      this.id!,
      this.discriminator!,
      { avatar: this.avatar! },
    );
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
      {
        avatar: this.avatar,
        size: options.size,
        format: options.format,
      },
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
  addRole(guildID, roleID) {
    return addRole(guildID, this.id!, roleID);
  },
  removeRole(guildID, roleID) {
    return removeRole(guildID, this.id!, roleID);
  },
};

export async function createMember(data: GuildMemberPayload, guildID: string) {
  const {
    joined_at: joinedAt,
    premium_since: premiumSince,
    roles,
    deaf,
    mute,
    nick,
    ...rest
  } = data;

  const { mfa_enabled: mfaEnabled, premium_type: premiumType, ...user } =
    rest.user || {};

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};

  for (const key of Object.keys(rest)) {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    restProps[key] = createNewProp(rest[key]);
  }

  for (const key of Object.keys(user)) {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    restProps[key] = createNewProp(user[key]);
  }

  const member = Object.create(baseMember, {
    ...restProps,
    mfaEnabled: createNewProp(mfaEnabled),
    premiumType: createNewProp(premiumType),
    /** The guild related data mapped by guild id */
    guilds: createNewProp(new Collection<string, GuildMember>()),
  });

  if (rest.user?.id) {
    const cached = await cacheHandlers.get("members", rest.user?.id);
    if (cached) {
      for (const [id, guild] of cached.guilds.entries()) {
        member.guilds.set(id, guild);
      }
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

  return member as Member;
}

export interface Member {
  /** The user's id */
  id: string;
  /** the user's username, not unique across the platform */
  username: string;
  /** The user's 4 digit discord tag */
  discriminator: string;
  /** The user's avatar hash */
  avatar: string | null;
  /** Whether the user is a bot */
  bot?: boolean;
  /** Whether the user is an official discord system user (part of the urgent message system.) */
  system?: boolean;
  /** the user's chosen language option */
  locale?: string;
  /** Whether the email on this account has been verified */
  verified?: boolean;
  /** The user's email */
  email?: string;
  /** The flags on a user's account. */
  flags?: number;
  /** Whether or not this user has 2FA enabled. */
  mfaEnabled?: boolean;
  /** The premium type for this user */
  premiumType?: number;
  /** The guild related data mapped by guild id */
  guilds: Collection<string, GuildMember>;

  // GETTERS
  /** The avatar url using the default format and size. */
  avatarURL: string;
  /** The mention string for this member */
  mention: string;
  /** The username#discriminator tag for this member */
  tag: string;

  // METHODS
  /** Returns the avatar url for this member and can be dynamically modified with a size or format */
  makeAvatarURL(options: { size?: ImageSize; format?: ImageFormats }): string;
  /** Returns the guild for this guildID */
  guild(guildID: string): Guild | undefined;
  /** Get the nickname or the username if no nickname */
  name(guildID: string): string;
  /** Get the nickname */
  guildMember(guildID: string): GuildMember | undefined;
  /** Send a direct message to the user is possible */
  sendDM(
    content: string | MessageContent,
  ): ReturnType<typeof sendDirectMessage>;
  /** Kick the member from a guild */
  kick(guildID: string, reason?: string): ReturnType<typeof kick>;
  /** Edit the member in a guild */
  edit(
    guildID: string,
    options: EditGuildMemberOptions,
  ): ReturnType<typeof editMember>;
  /** Ban a member in a guild */
  ban(guildID: string, options: BanOptions): ReturnType<typeof ban>;
  /** Add a role to the member */
  addRole(
    guildID: string,
    roleID: string,
    reason?: string,
  ): ReturnType<typeof addRole>;
  /** Remove a role from the member */
  removeRole(
    guildID: string,
    roleID: string,
    reason?: string,
  ): ReturnType<typeof removeRole>;

  // Index signature
  [key: string]: ValueOf<Member>;
}
