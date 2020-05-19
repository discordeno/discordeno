import { Permission, Permissions } from "../types/permission.ts";
import { RoleData } from "../types/role.ts";
import { cache } from "./cache.ts";
import { botID } from "../module/client.ts";
import { Role } from "../structures/role.ts";

export function memberHasPermission(
  member_id: string,
  owner_id: string,
  role_data: RoleData[],
  member_role_ids: string[],
  permissions: Permission[],
) {
  if (member_id === owner_id) return true;

  const permissionBits = role_data
    .filter((role) => member_role_ids.includes(role.id))
    .reduce((bits, data) => {
      bits |= data.permissions;

      return bits;
    }, 0);

  if (permissionBits & Permissions.ADMINISTRATOR) return true;

  return permissions.every((permission) =>
    permissionBits & Permissions[permission]
  );
}

export function botHasPermission(
  guild_id: string,
  permissions: Permissions[],
) {
  const guild = cache.guilds.get(guild_id);
  if (!guild) return false;

  const member = guild.members.get(botID);
  if (!member) return false;

  const permissionBits = [...guild.roles.values()]
    .map((role) => role.raw)
    .filter((role) => member.roles.includes(role.id))
    .reduce((bits, data) => {
      bits |= data.permissions;

      return bits;
    }, 0);

  if (permissionBits & Permissions.ADMINISTRATOR) return true;

  return permissions.every((permission) => permissionBits & permission);
}

export function calculatePermissions(permission_bits: number) {
  return Object.keys(Permissions).filter((perm) => {
    return permission_bits & Permissions[perm as Permission];
  });
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
