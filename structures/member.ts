import { endpoints } from "../constants/discord.ts";
import { formatImageURL } from "../utils/cdn.ts";
import { MemberCreatePayload, EditMemberOptions } from "../types/member.ts";
import { ImageSize, ImageFormats } from "../types/cdn.ts";
import { Permission, Permissions } from "../types/permission.ts";
import { RoleData } from "../types/role.ts";
import {
  memberHasPermission,
  botHasPermission,
  highestRole,
  higherRolePosition,
} from "../utils/permissions.ts";
import { Errors } from "../types/errors.ts";
import { RequestManager } from "../module/requestManager.ts";
import { botID } from "../module/client.ts";

export const createMember = (
  data: MemberCreatePayload,
  guildID: string,
  roleData: RoleData[],
  ownerID: string,
) => ({
  ...data,
  /** The complete raw data from the member create payload */
  raw: data,
  /** When the user joined the guild */
  joinedAt: Date.parse(data.joined_at),
  /** When the user used their nitro boost on the server. */
  premiumSince: data.premium_since ? Date.parse(data.premium_since) : undefined,
  /** The full username#discriminator */
  tag: `${data.user.username}#${data.user.discriminator}`,
  /** The user mention with nickname if possible */
  mention: `<@!${data.user.id}>`,

  /** The users custom avatar or the default avatar */
  avatarURL: (size: ImageSize = 128, format?: ImageFormats) =>
    data.user.avatar
      ? formatImageURL(
        endpoints.USER_AVATAR(data.user.id, data.user.avatar),
        size,
        format,
      )
      : endpoints.USER_DEFAULT_AVATAR(Number(data.user.discriminator) % 5),
  /** Add a role to the member */
  addRole: (roleID: string, reason?: string) => {
    const botsHighestRole = highestRole(guildID, botID);
    if (
      botsHighestRole &&
      !higherRolePosition(guildID, botsHighestRole.id, roleID)
    ) {
      throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
    }

    if (!botHasPermission(guildID, [Permissions.MANAGE_ROLES])) {
      throw new Error(Errors.MISSING_MANAGE_ROLES);
    }

    return RequestManager.put(
      endpoints.GUILD_MEMBER_ROLE(guildID, data.user.id, roleID),
      { reason },
    );
  },
  /** Remove a role from the member */
  remove_role: (roleID: string, reason?: string) => {
    const botsHighestRole = highestRole(guildID, botID);
    if (
      botsHighestRole &&
      !higherRolePosition(guildID, botsHighestRole.id, roleID)
    ) {
      throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
    }

    if (!botHasPermission(guildID, [Permissions.MANAGE_ROLES])) {
      throw new Error(Errors.MISSING_MANAGE_ROLES);
    }
    return RequestManager.delete(
      endpoints.GUILD_MEMBER_ROLE(guildID, data.user.id, roleID),
      { reason },
    );
  },
  /** Kick a member from the server */
  kick: (reason?: string) => {
    const botsHighestRole = highestRole(guildID, botID);
    const membersHighestRole = highestRole(guildID, data.user.id);
    if (
      botsHighestRole && membersHighestRole &&
      botsHighestRole.position <= membersHighestRole.position
    ) {
      throw new Error(Errors.BOTS_HIGHEST_ROLE_TOO_LOW);
    }

    if (!botHasPermission(guildID, [Permissions.KICK_MEMBERS])) {
      throw new Error(Errors.MISSING_KICK_MEMBERS);
    }
    return RequestManager.delete(
      endpoints.GUILD_MEMBER(guildID, data.user.id),
      { reason },
    );
  },
  /** Edit the member */
  edit: (options: EditMemberOptions) => {
    if (options.nick) {
      if (options.nick.length > 32) {
        throw new Error(Errors.NICKNAMES_MAX_LENGTH);
      }
      if (!botHasPermission(guildID, [Permissions.MANAGE_NICKNAMES])) {
        throw new Error(Errors.MISSING_MANAGE_NICKNAMES);
      }
    }

    if (
      options.roles &&
      !botHasPermission(guildID, [Permissions.MANAGE_ROLES])
    ) {
      throw new Error(Errors.MISSING_MANAGE_ROLES);
    }

    if (options.mute) {
      // TODO: This should check if the member is in a voice channel
      if (
        !botHasPermission(guildID, [Permissions.MUTE_MEMBERS])
      ) {
        throw new Error(Errors.MISSING_MUTE_MEMBERS);
      }
    }

    if (
      options.deaf &&
      !botHasPermission(guildID, [Permissions.DEAFEN_MEMBERS])
    ) {
      throw new Error(Errors.MISSING_DEAFEN_MEMBERS);
    }

    // TODO: if channel id is provided check if the bot has CONNECT and MOVE in channel and current channel

    return RequestManager.patch(
      endpoints.GUILD_MEMBER(guildID, data.user.id),
      options,
    );
  },
  /** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
  hasPermissions: (permissions: Permission[]) => {
    return memberHasPermission(
      data.user.id,
      ownerID,
      roleData,
      data.roles,
      permissions,
    );
  },
});


      
| Name                                                         | Language         |
| ------------------------------------------------------------ | ----------       |
| [discljord](https://github.com/igjoshua/discljord)           | Clojure          |
| [aegis.cpp](https://github.com/zeroxs/aegis.cpp)             | C++              |
| [discordcr](https://github.com/discordcr/discordcr)          | Crystal          |
| [Discord.Net](https://github.com/RogueException/Discord.Net) | C#               |
| [DSharpPlus](https://github.com/DSharpPlus/DSharpPlus)       | C#               |
| [dscord](https://github.com/b1naryth1ef/dscord)              | D                |
| [DiscordGo](https://github.com/bwmarrin/discordgo)           | Go               |
| [DisGord](https://github.com/andersfylling/disgord)          | Go               |
| [catnip](https://github.com/mewna/catnip)                    | Java             |
| [Discord4J](https://discord4j.com/)                          | Java             |
| [Javacord](https://github.com/Javacord/Javacord)             | Java             |
| [JDA](https://github.com/DV8FromTheWorld/JDA)                | Java             |
| [discord.js](https://github.com/discordjs/discord.js)        | JavaScript       |
| [Eris](https://github.com/abalabahaha/eris)                  | JavaScript       |
| [Discord.jl](https://github.com/Xh4H/Discord.jl)             | Julia            |
| [Discordia](https://github.com/SinisterRectus/Discordia)     | Lua              |
| [discordnim](https://github.com/Krognol/discordnim)          | Nim              |
| [RestCord](https://www.restcord.com/)                        | PHP              |
| [discord.py](https://github.com/Rapptz/discord.py)           | Python           |
| [disco](https://github.com/b1naryth1ef/disco)                | Python           |
| [discordrb](https://github.com/discordrb/discordrb)          | Ruby             |
| [discord-rs](https://github.com/SpaceManiac/discord-rs)      | Rust             |
| [Serenity](https://github.com/serenity-rs/serenity)          | Rust             |
| [AckCord](https://github.com/Katrix/AckCord)                 | Scala            |
| [Sword](https://github.com/Azoy/Sword)                       | Swift            |
| [Discordeno](https://github.com/Skillz4Killz/Discordeno)     | Typescript(Deno) |
