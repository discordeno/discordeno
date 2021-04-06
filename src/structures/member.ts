import { cache, cacheHandlers } from "../cache.ts";
import { avatarURL } from "../helpers/members/avatar_url.ts";
import { banMember } from "../helpers/members/ban_member.ts";
import { editMember } from "../helpers/members/edit_member.ts";
import { kickMember } from "../helpers/members/kick_member.ts";
import { sendDirectMessage } from "../helpers/members/send_direct_message.ts";
import { addRole } from "../helpers/roles/add_role.ts";
import { removeRole } from "../helpers/roles/remove_role.ts";
import { CreateMessage } from "../types/channels/create_message.ts";
import { CreateGuildBan } from "../types/guilds/create_guild_ban.ts";
import {
  DiscordGuildMember,
  GuildMember,
} from "../types/guilds/guild_member.ts";
import { ModifyGuildMember } from "../types/guilds/modify_guild_member.ts";
import { DiscordImageFormat } from "../types/misc/image_format.ts";
import { DiscordImageSize } from "../types/misc/image_size.ts";
import { DiscordUser, User } from "../types/users/user.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp, snakeKeysToCamelCase } from "../util/utils.ts";
import { GuildStruct } from "./guild.ts";

const baseMember: Partial<MemberStruct> = {
  get avatarURL() {
    return avatarURL(this.id!, this.discriminator!, this.avatar!);
  },
  get mention() {
    return `<@!${this.id!}>`;
  },
  get tag() {
    return `${this.username!}#${this.discriminator!}`;
  },

  // METHODS
  makeAvatarURL(options) {
    return avatarURL(
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
  // The `user` param in `DiscordGuildMember` is optional since discord does not send it in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events. But this data in there is required to build this structure so it is required in this case
  data: Omit<DiscordGuildMember, "user"> & { user: DiscordUser },
  guildId: string,
) {
  const {
    user,
    joinedAt,
    premiumSince,
    ...rest
  } = snakeKeysToCamelCase(data) as Omit<GuildMember, "user"> & {
    user: DiscordUser;
  };

  const props: Record<string, ReturnType<typeof createNewProp>> = {};

  for (const key of Object.keys(rest)) {
    // @ts-ignore index signature
    props[key] = createNewProp(rest[key]);
  }

  for (const key of Object.keys(user)) {
    // @ts-ignore index signature
    props[key] = createNewProp(user[key]);
  }

  const member: MemberStruct = Object.create(baseMember, {
    ...props,
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
    nick: rest.nick,
    roles: rest.roles,
    joinedAt: Date.parse(joinedAt),
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    deaf: rest.deaf,
    mute: rest.mute,
  });

  return member;
}

export interface MemberStruct extends GuildMember, User {
  /** The guild related data mapped by guild id */
  guilds: Collection<
    string,
    Omit<GuildMember, "joinedAt" | "premiumSince"> & {
      joinedAt: number;
      premiumSince?: number;
    }
  >;

  // GETTERS
  /** The avatar url using the default format and size. */
  avatarURL: string;
  /** The mention string for this member */
  mention: string;
  /** The username#discriminator tag for this member */
  tag: string;

  // METHODS

  /** Returns the avatar url for this member and can be dynamically modified with a size or format */
  makeAvatarURL(
    options: { size?: DiscordImageSize; format?: DiscordImageFormat },
  ): string;
  /** Returns the guild for this guildID */
  guild(guildID: string): GuildStruct | undefined;
  /** Get the nickname or the username if no nickname */
  name(guildID: string): string;
  /** Get the guild member object for the specified guild */
  guildMember(guildID: string): GuildMember | undefined;
  /** Send a direct message to the user is possible */
  sendDM(
    content: string | CreateMessage,
  ): ReturnType<typeof sendDirectMessage>;
  /** Kick the member from a guild */
  kick(guildID: string, reason?: string): ReturnType<typeof kickMember>;
  /** Edit the member in a guild */
  edit(
    guildID: string,
    options: ModifyGuildMember,
  ): ReturnType<typeof editMember>;
  /** Ban a member in a guild */
  ban(guildID: string, options: CreateGuildBan): ReturnType<typeof banMember>;
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
}
