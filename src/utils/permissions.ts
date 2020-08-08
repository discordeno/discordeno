import {
  Permission,
  Permissions,
} from "../types/permission.ts";
import { cache } from "./cache.ts";
import { botID } from "../module/client.ts";
import { Role } from "../structures/role.ts";
import { Guild } from "../structures/guild.ts";

/** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
export function memberIDHasPermission(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  const guild = cache.guilds.get(guildID);
  if (!guild) return false;

  if (memberID === guild.ownerID) return true;

  const member = guild.members.get(memberID);
  if (!member) return false;

  return memberHasPermission(member.guildID, guild, member.roles, permissions)
}

/** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
export function memberHasPermission(
  memberID: string,
  guild: Guild,
  memberRoleIDs: string[],
  permissions: Permission[],
) {
  if (memberID === guild.ownerID) return true;

  const permissionBits = memberRoleIDs.map((id) =>
    guild.roles.get(id)?.permissions_new
  )
    .reduce((bits, permissions) => {
      bits |= BigInt(permissions);
      return bits;
    }, BigInt(0));

  if (permissionBits & BigInt(Permissions.ADMINISTRATOR)) return true;

  return permissions.every((permission) =>
    permissionBits & BigInt(Permissions[permission])
  );
}

export function botHasPermission(guildID: string, permissions: Permissions[]) {
  const guild = cache.guilds.get(guildID);
  if (!guild) return false;

  const member = guild.members.get(botID);
  if (!member) return false;

  const permissionBits = member.roles
    .map((id) => guild.roles.get(id)!)
    .reduce((bits, data) => {
      bits |= BigInt(data.permissions_new);

      return bits;
    }, BigInt(0));

  if (permissionBits & BigInt(Permissions.ADMINISTRATOR)) return true;

  return permissions.every((permission) => permissionBits & BigInt(permission));
}

/** Checks if the bot has the permissions in a channel */
export function botHasChannelPermissions(
  channelID: string,
  permissions: Permissions[],
) {
  return hasChannelPermissions(channelID, botID, permissions);
}

/** Checks if a user has permissions in a channel. */
export function hasChannelPermissions(
  channelID: string,
  memberID: string,
  permissions: Permissions[],
) {
  const channel = cache.channels.get(channelID);
  if (!channel?.guildID) return true;

  const guild = cache.guilds.get(channel.guildID);
  if (!guild) return false;

  if (guild.ownerID === memberID) return true;
  if (botHasPermission(guild.id, [Permissions.ADMINISTRATOR])) return true;

  const member = guild.members.get(memberID);
  if (!member) return false;

  const memberOverwrite = channel.permission_overwrites?.find((o) =>
    o.id === memberID
  );

  const rolesOverwrites = channel.permission_overwrites?.filter((o) =>
    member.roles.includes(o.id)
  );

  const everyoneOverwrite = channel.permission_overwrites?.find((o) =>
    o.id === guild.id
  );

  const allowedPermissions = new Set<Permissions>();

  if (memberOverwrite) {
    // One of the necessary permissions is denied
    if (
      permissions.some((perm) =>
        BigInt(memberOverwrite.deny_new) & BigInt(perm)
      )
    ) {
      return false;
    }
    permissions.forEach((perm) => {
      // Already allowed perm
      if (allowedPermissions.has(perm)) return;
      // This perm is allowed so we save it
      if (BigInt(memberOverwrite.allow_new) & BigInt(perm)) {
        allowedPermissions.add(perm);
      }
    });
  }

  // Check the necessary permissions for roles
  if (rolesOverwrites?.length) {
    if (
      rolesOverwrites.some((overwrite) =>
        permissions.some((perm) =>
          (BigInt(overwrite.deny_new) & BigInt(perm)) &&
          // If another role allows these perms then they are not denied
          !rolesOverwrites.some((o) => BigInt(o.allow_new) & BigInt(perm)) &&
          // Make sure the memberOverwrite does not allow this perm
          !(memberOverwrite && BigInt(memberOverwrite.allow_new) & BigInt(perm))
        )
      )
    ) {
      return false;
    }

    permissions.forEach((perm) => {
      // Already allowed perm
      if (allowedPermissions.has(perm)) return;
      rolesOverwrites.forEach((overwrite) => {
        // This perm is allowed so we save it
        if (BigInt(overwrite.allow_new) & BigInt(perm)) {
          allowedPermissions.add(perm);
        }
      });
    });
  }

  // Check the necessary permissions for everyone
  if (
    everyoneOverwrite
  ) {
    if (
      permissions.some((perm) =>
        BigInt(everyoneOverwrite.deny_new) & BigInt(perm) &&
        !allowedPermissions.has(perm)
      )
    ) {
      return false;
    }
    // If all permissions are granted
    if (
      permissions.every((perm) =>
        BigInt(everyoneOverwrite.allow_new) & BigInt(perm)
      )
    ) {
      return true;
    }
  }

  return botHasPermission(guild.id, permissions);
}

export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(Permissions).filter((perm) => {
    if (typeof perm !== "number") return false;
    return permissionBits & BigInt(Permissions[perm as Permission]);
  }) as Permission[];
}

export function highestRole(guildID: string, memberID: string) {
  const guild = cache.guilds.get(guildID);
  if (!guild) return;

  const member = guild?.members.get(memberID);
  if (!member) return;

  let memberHighestRole: Role | undefined;

  for (const roleID of member.roles) {
    const role = guild.roles.get(roleID);
    if (!role) continue;

    if (
      !memberHighestRole || memberHighestRole.position < role.position
    ) {
      memberHighestRole = role;
    }
  }

  return memberHighestRole || (guild.roles.get(guild.id) as Role);
}

export function higherRolePosition(
  guildID: string,
  roleID: string,
  otherRoleID: string,
) {
  const guild = cache.guilds.get(guildID);
  if (!guild) return;

  const role = guild.roles.get(roleID);
  const otherRole = guild.roles.get(otherRoleID);
  if (!role || !otherRole) return;

  // Rare edge case handling
  if (role.position === otherRole.position) {
    return role.id < otherRole.id
  }

  return role.position > otherRole.position;
}
