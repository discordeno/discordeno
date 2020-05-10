import { Permission, Permissions } from "../types/permission.ts";
import { RoleData } from "../types/role.ts";
import { cache } from "./cache.ts";

export const memberHasPermission = (
  member_id: string,
  owner_id: string,
  role_data: RoleData[],
  member_role_ids: string[],
  permissions: Permission[],
) => {
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
};

export const botHasPermission = (
  guild_id: string,
  botID: string,
  permissions: Permissions[],
) => {
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
};

export const calculatePermissions = (permission_bits: number) => {
  return Object.keys(Permissions).filter((perm) => {
    return permission_bits & Permissions[perm as Permission];
  });
};
