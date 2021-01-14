import { cacheHandlers } from "../../mod.ts";
import { Role } from "../api/structures/mod.ts";
import { Errors, Permission, Permissions } from "../api/types/mod.ts";
import { botID } from "../bot.ts";

export async function computeBasePermissions(
  memberID: string,
  guildID: string,
) {
  const guild = await cacheHandlers.get("guilds", guildID);
  if (!guild) throw Error(Errors.GUILD_NOT_FOUND);

  // If the memberID is equal to the guild ownerID we don't need to calculate anything so we return ADMINISTRATOR permission
  if (guild.ownerID === memberID) return "8";

  const member = await cacheHandlers.get("members", memberID);
  if (!member) throw Error(Errors.MEMBER_NOT_FOUND);

  let permissions = BigInt(0);

  // Calculate the role permissions bits, @everyone role is not in memberRoleIDs so we need to pass guildID manualy
  permissions |= [
    ...member.guilds.get(guildID)?.roles || [],
    guildID,
  ]
    .map((id) => guild.roles.get(id)?.permissions)
    .filter((id) => id)
    // Removes any edge case undefined
    .reduce((bits, perms) => {
      bits |= BigInt(perms);
      return bits;
    }, BigInt(0));

  // If one role has ADMINISTRATOR permissions we don't need to return the specifiv permissions so we return ADMINISTRATOR permission
  if (permissions & BigInt(Permissions.ADMINISTRATOR)) return "8";

  // Return the members permission bits as a string
  return permissions.toString();
}

export async function computeChannelOverites(
  memberID: string,
  channelID: string,
) {
  const channel = await cacheHandlers.get("channels", channelID);
  if (!channel) throw Error(Errors.CHANNEL_NOT_FOUND);
  if (!channel.guildID) return "8";

  let permissions = BigInt(computeBasePermissions(memberID, channel.guildID));
  if (permissions & BigInt(Permissions.ADMINISTRATOR)) return "8";

  const member = await cacheHandlers.get("members", memberID);
  if (!member) throw Error(Errors.MEMBER_NOT_FOUND);

  const overwriteEveryone = channel?.permissionOverwrites.find((overwrite) =>
    overwrite.id === channel.guildID
  );
  if (overwriteEveryone) {
    permissions &= ~BigInt(overwriteEveryone.deny);
    permissions |= BigInt(overwriteEveryone.allow);
  }

  const overwrites = channel?.permissionOverwrites;

  let allow = BigInt(0);
  let deny = BigInt(0);
  let roleID: string;
  let overwriteRole;

  for (roleID in member.guilds.get(channel.guildID)?.roles) {
    overwriteRole = overwrites.find((overwrite) => overwrite.id === roleID);
    if (overwriteRole) {
      allow |= BigInt(overwriteRole.allow);
      deny &= ~BigInt(overwriteRole.deny);
    }
  }

  permissions &= ~deny;
  permissions |= allow;

  const overwriteMember = overwrites.find((overwrite) =>
    overwrite.id === memberID
  );
  if (overwriteMember) {
    permissions &= ~BigInt(overwriteMember.deny);
    permissions |= BigInt(overwriteMember.allow);
  }

  return permissions;
}

export function validatePermissions(
  permissionBits: string,
  permissions: Permission[],
) {
  return permissions.every((permission) =>
    BigInt(permissionBits) & BigInt(Permissions[permission])
  );
}

export async function hasGuildPermissions(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  const basePermissions = await computeBasePermissions(memberID, guildID);

  return validatePermissions(basePermissions, permissions);
}

export function botHasGuildPermissions(
  guildID: string,
  permissions: Permission[],
) {
  return hasGuildPermissions(guildID, botID, permissions);
}

export function missingPermissions(
  permissionBits: string,
  permissions: Permission[],
) {
  const missing: Permission[] = [];
  permissions.forEach((permission) => {
    if (!(BigInt(permissionBits) & BigInt(Permissions[permission]))) {
      missing.push(permission);
    }
  });

  return missing;
}

export async function throwOnMissingGuildPermission(
  memberID: string,
  guildID: string,
  permissions: Permission[],
) {
  const permissionBits = await computeBasePermissions(memberID, guildID);

  const missing = missingPermissions(permissionBits, permissions);
  if (missing.length) {
    throw new Error(Errors[`MISSING_${missing[0]}` as Errors]);
  }
}

export function botThrowOnMissingGuildPermission(
  guildID: string,
  permissions: Permission[],
) {
  return throwOnMissingGuildPermission(botID, guildID, permissions);
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
