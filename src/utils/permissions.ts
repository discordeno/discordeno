import { cacheHandlers } from "../controllers/cache.ts";
import { botID } from "../module/client.ts";
import { Role } from "../structures/structures.ts";
import {
  Errors,
  Permission,
  Permissions,
  RawOverwrite,
} from "../types/types.ts";

/** Returns you the permission bits from the member in this guild */
export async function calculateServerPerm(memberID: string, guildID: string) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw Error(Errors.GUILD_NOT_FOUND);

  // Check if the member is the owner of the guild, if he is, returns admin permissions
  if (memberID === guild.ownerID) return "8";

  const member = (await cacheHandlers.get("members", botID))?.guilds.get(
    guildID,
  );
  if (!member) throw Error(Errors.MEMBER_NOT_FOUND);

  return [...member.roles, guild.id]
    .map((id) => guild.roles.get(id)!)
    // Remove any edge case undefined
    .filter((role) => role)
    .reduce((bits, data) => {
      bits |= BigInt(data.permissions);

      return bits;
    }, BigInt(0)).toString();
}

/** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
export async function hasServerPerm(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  const permissionBits = await calculateServerPerm(memberID, guildID);

  return validatePerms(permissionBits, permissions);
}

/** Checks if the member has this permission in the channel. If the member is an owner or has admin perms it will always be true. */
export async function hasChannelPermissions(
  channelID: string,
  memberID: string,
  permissions: Permission[],
) {
  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel) throw Error(Errors.CHANNEL_NOT_FOUND);
  if (!channel.guildID) return true;

  const guild = await cacheHandlers.get("guilds", channel.guildID);
  if (!guild) throw Error(Errors.GUILD_NOT_FOUND);

  if (guild.ownerID === memberID) return true;

  if (hasServerPerm(memberID, guild.id, ["ADMINISTRATOR"])) return true;

  const member = (await cacheHandlers.get("members", memberID))?.guilds.get(
    guild.id,
  );
  if (!member) throw Error(Errors.MEMBER_NOT_FOUND);

  let memberOverwrite: RawOverwrite | undefined;
  let everyoneOverwrite: RawOverwrite | undefined;
  let rolesOverwrites: RawOverwrite[] = [];

  for (const overwrite of channel.permissionOverwrites || []) {
    // If the overwrite on this channel is specific to this member
    if (overwrite.id === memberID) memberOverwrite = overwrite;
    // If it is the everyone role overwrite
    if (overwrite.id === guild.id) everyoneOverwrite = overwrite;
    // If it is one of the roles the member has
    if (member.roles.includes(overwrite.id)) rolesOverwrites.push(overwrite);
  }

  const allowedPermissions = new Set<Permission>();

  // Member perms override everything so we must check them first
  if (memberOverwrite) {
    const allowBits = memberOverwrite.allow;
    const denyBits = memberOverwrite.deny;
    for (const perm of permissions) {
      // One of the necessary permissions is denied. Since this is main permission we can cancel if its denied.
      if (BigInt(denyBits) & BigInt(Permissions[perm])) return false;
      // Already allowed perm
      if (allowedPermissions.has(perm)) continue;

      // This perm is allowed so we save it
      if (BigInt(allowBits) & BigInt(Permissions[perm])) {
        allowedPermissions.add(perm);
      }
    }
  }

  // Check the necessary permissions for roles
  for (const perm of permissions) {
    // If this is already allowed, skip
    if (allowedPermissions.has(perm)) continue;

    for (const overwrite of rolesOverwrites) {
      const allowBits = overwrite.allow;
      // This perm is allowed so we save it
      if (BigInt(allowBits) & BigInt(Permissions[perm])) {
        allowedPermissions.add(perm);
        break;
      }

      const denyBits = overwrite.deny;
      // If this role denies it we need to save and check if another role allows it, allows > deny
      if (BigInt(denyBits) & BigInt(Permissions[perm])) {
        // This role denies his perm, but before denying we need to check all other roles if any allow as allow > deny
        const isAllowed = rolesOverwrites.some((o) =>
          BigInt(o.allow) & BigInt(Permissions[perm])
        );
        if (isAllowed) continue;
        // This permission is in fact denied. Since Roles overrule everything below here we can cancel ou here
        return false;
      }
    }
  }

  if (everyoneOverwrite) {
    const allowBits = everyoneOverwrite.allow;
    const denyBits = everyoneOverwrite.deny;
    for (const perm of permissions) {
      // Already allowed perm
      if (allowedPermissions.has(perm)) continue;
      // One of the necessary permissions is denied. Since everyone overwrite overrides role perms we can cancel here
      if (BigInt(denyBits) & BigInt(Permissions[perm])) return false;
      // This perm is allowed so we save it
      if (BigInt(allowBits) & BigInt(Permissions[perm])) {
        allowedPermissions.add(perm);
      }
    }
  }

  // Is there any remaining permission to check role perms or can we determine that permissions are allowed
  if (permissions.every((perm) => allowedPermissions.has(perm))) return true;

  // Some permission was not explicitly allowed so we default to checking role perms directly
  return hasServerPerm(memberID, guild.id, permissions);
}

/** Returns you an array of the permissions that are not in totalBits */
export function missingPermissions(
  totalBits: string,
  permissions: Permission[],
) {
  const missing: Permission[] = [];
  permissions.forEach((permission) => {
    if (!(BigInt(totalBits) & BigInt(Permissions[permission]))) {
      missing.push(permission);
    }
  });

  return missing;
}

/** Throws an error if the given member has not the permissions in the given guild */
export async function throwOnMissingServerPermission(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  const permissionBits = await calculateServerPerm(memberID, guildID);

  const missing = missingPermissions(permissionBits, permissions);
  if (missing.length) {
    throw new Error(Errors[`MISSING_${missing[0]}` as Errors]);
  }
}

/** Checks if the permissions matches the permission bits */
export function validatePerms(perms: string, permissions: Permission[]) {
  return permissions.every((permission) =>
    BigInt(perms) & BigInt(Permissions[permission])
  );
}

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(Permissions).filter((perm) => {
    if (Number(perm)) return false;
    return permissionBits & BigInt(Permissions[perm as Permission]);
  }) as Permission[];
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: Permission[]) {
  return permissions.reduce(
    (bits, perm) => bits |= BigInt(Permissions[perm]),
    BigInt(0),
  ).toString();
}

/** Gets the highest role from the member in this guild */
export async function highestRole(guildID: string, memberID: string) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  const member = (await cacheHandlers.get("members", memberID))?.guilds.get(
    guildID,
  );
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

/** Checks if the first role is higher than the second role */
export async function higherRolePosition(
  guildID: string,
  roleID: string,
  otherRoleID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  const role = guild.roles.get(roleID);
  const otherRole = guild.roles.get(otherRoleID);
  if (!role || !otherRole) return;

  // Rare edge case handling
  if (role.position === otherRole.position) {
    return role.id < otherRole.id;
  }

  return role.position > otherRole.position;
}

/** Checks if the member has a higher position than the given role */
export async function isHigherPosition(
  guildID: string,
  memberID: string,
  compareRoleID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) return;

  if (guild.ownerID === memberID) return true;

  const memberHighestRole = await highestRole(guildID, memberID);
  const compareRole = guild.roles.get(compareRoleID);
  if (!memberHighestRole || !compareRole) return;

  // Rare edge case handling
  if (memberHighestRole.position === compareRole.position) {
    return memberHighestRole.id < compareRole.id;
  }

  return memberHighestRole.position > compareRole.position;
}
