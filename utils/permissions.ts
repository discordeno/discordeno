import { Permission, Permissions } from "../types/permission.ts";
import { cache } from "./cache.ts";
import { botID } from "../module/client.ts";
import { Role } from "../structures/role.ts";
import { Guild } from "../structures/guild.ts";

/** Checks if the member has this permission. If the member is an owner or has admin perms it will always be true. */
export function memberHasPermission(
  memberID: string,
  guild: Guild,
  memberRoleIDs: string[],
  permissions: Permission[],
) {
  if (memberID === guild.ownerID) return true;

  const permissionBits = memberRoleIDs.map((id) =>
    guild.roles.get(id)?.permissions || 0
  )
    .reduce((bits, permissions) => {
      bits |= permissions;
      return bits;
    }, 0);

  if (permissionBits & Permissions.ADMINISTRATOR) return true;

  return permissions.every((permission) =>
    permissionBits & Permissions[permission]
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
      bits |= data.permissions;

      return bits;
    }, 0);

  if (permissionBits & Permissions.ADMINISTRATOR) return true;

  return permissions.every((permission) => permissionBits & permission);
}

export function calculatePermissions(permissionBits: number) {
  return Object.keys(Permissions).filter((perm) => {
    return permissionBits & Permissions[perm as Permission];
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

  return role.position > otherRole.position;
}
