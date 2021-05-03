import { eventHandlers } from "../bot.ts";
import { cache, cacheHandlers } from "../cache.ts";
import { avatarURL } from "../helpers/members/avatar_url.ts";
import { banMember } from "../helpers/members/ban_member.ts";
import { editMember } from "../helpers/members/edit_member.ts";
import { kickMember } from "../helpers/members/kick_member.ts";
import { sendDirectMessage } from "../helpers/members/send_direct_message.ts";
import { addRole } from "../helpers/roles/add_role.ts";
import { removeRole } from "../helpers/roles/remove_role.ts";
import { CreateGuildBan } from "../types/guilds/create_guild_ban.ts";
import {
  GuildMember,
  GuildMemberWithUser,
} from "../types/guilds/guild_member.ts";
import { ModifyGuildMember } from "../types/guilds/modify_guild_member.ts";
import { CreateMessage } from "../types/messages/create_message.ts";
import { DiscordImageFormat } from "../types/misc/image_format.ts";
import { DiscordImageSize } from "../types/misc/image_size.ts";
import { User } from "../types/users/user.ts";
import { snowflakeToBigint } from "../util/bigint.ts";
import { Collection } from "../util/collection.ts";
import { createNewProp } from "../util/utils.ts";
import { DiscordenoGuild } from "./guild.ts";

const MEMBER_SNOWFLAKES = [
  "roles",
  "id",
  "discriminator",
];

const baseMember: Partial<DiscordenoMember> = {
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

export async function createDiscordenoMember(
  // The `user` param in `DiscordGuildMember` is optional since discord does not send it in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events. But this data in there is required to build this structure so it is required in this case
  data: GuildMemberWithUser,
  guildId: bigint,
) {
  const {
    user,
    joinedAt,
    premiumSince,
    ...rest
  } = data;

  const props: Record<string, ReturnType<typeof createNewProp>> = {};

  for (const [key, value] of Object.entries(rest)) {
    eventHandlers.debug?.(
      "loop",
      `Running for of loop for Object.keys(rest) in DiscordenoMember function.`,
    );

    if (key === "roles") {
      props[key] = value.map((id: string) => snowflakeToBigint(id));
      continue
    }

    props[key] = createNewProp(
      MEMBER_SNOWFLAKES.includes(key)
        ? value ? snowflakeToBigint(value) : undefined
        : value,
    );
  }

  for (const [key, value] of Object.entries(user)) {
    eventHandlers.debug?.(
      "loop",
      `Running for of for Object.keys(user) loop in DiscordenoMember function.`,
    );

    props[key] = createNewProp(
      MEMBER_SNOWFLAKES.includes(key)
        ? value ? snowflakeToBigint(value) : undefined
        : value,
    );
  }

  const member: DiscordenoMember = Object.create(baseMember, {
    ...props,
    /** The guild related data mapped by guild id */
    guilds: createNewProp(new Collection<bigint, GuildMember>()),
  });

  const cached = await cacheHandlers.get("members", snowflakeToBigint(user.id));
  if (cached) {
    for (const [id, guild] of cached.guilds.entries()) {
      eventHandlers.debug?.(
        "loop",
        `Running for of for cached.guilds.entries() loop in DiscordenoMember function.`,
      );
      member.guilds.set(id, guild);
    }
  }

  // User was never cached before
  member.guilds.set(guildId, {
    nick: rest.nick,
    roles: rest.roles.map((id) => snowflakeToBigint(id)),
    joinedAt: Date.parse(joinedAt),
    premiumSince: premiumSince ? Date.parse(premiumSince) : undefined,
    deaf: rest.deaf,
    mute: rest.mute,
  });

  return member;
}

export interface DiscordenoMember extends
  Omit<
    GuildMember,
    "roles"
  >,
  Omit<
    User,
    | "discriminator"
    | "id"
  > {
  /** Array of role object ids */
  roles: bigint[];
  /** The user's id */
  id: bigint;
  /** The user's 4-digit discord-tag */
  discriminator: bigint;
  /** The guild related data mapped by guild id */
  guilds: Collection<
    bigint,
    Omit<GuildMember, "joinedAt" | "premiumSince" | "roles"> & {
      joinedAt: number;
      premiumSince?: number;
      roles: bigint[];
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
  /** Returns the guild for this guildId */
  guild(guildId: bigint): DiscordenoGuild | undefined;
  /** Get the nickname or the username if no nickname */
  name(guildId: bigint): string;
  /** Get the guild member object for the specified guild */
  guildMember(
    guildId: bigint,
  ):
    | Omit<GuildMember, "joinedAt" | "premiumSince" | "roles"> & {
      joinedAt: number;
      premiumSince?: number;
      roles: bigint[];
    }
    | undefined;
  /** Send a direct message to the user is possible */
  sendDM(
    content: string | CreateMessage,
  ): ReturnType<typeof sendDirectMessage>;
  /** Kick the member from a guild */
  kick(guildId: bigint, reason?: string): ReturnType<typeof kickMember>;
  /** Edit the member in a guild */
  edit(
    guildId: bigint,
    options: Omit<ModifyGuildMember, "channelId"> & { channelId?: bigint | null },
  ): ReturnType<typeof editMember>;
  /** Ban a member in a guild */
  ban(guildId: bigint, options: CreateGuildBan): ReturnType<typeof banMember>;
  /** Add a role to the member */
  addRole(
    guildId: bigint,
    roleId: bigint,
    reason?: string,
  ): ReturnType<typeof addRole>;
  /** Remove a role from the member */
  removeRole(
    guildId: bigint,
    roleId: bigint,
    reason?: string,
  ): ReturnType<typeof removeRole>;
}
