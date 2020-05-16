import { Permission, Permissions } from "../types/permission.ts";
import { RoleData } from "../types/role.ts";
import { cache } from "./cache.ts";

export const memberHasPermission = (
  memberID: string,
  ownerID: string,
  roleData: RoleData[],
  memberRoleIDs: string[],
  permissions: Permission[],
) => {
  if (memberID === ownerID) return true;

  const permissionBits = roleData
    .filter((role) => memberRoleIDs.includes(role.id))
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
  guildID: string,
  botID: string,
  permissions: Permissions[],
) => {
  const guild = cache.guilds.get(guildID);
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

export const calculatePermissions = (permissionBits: number) => {
  return Object.keys(Permissions).filter((perm) => {
    return permissionBits & Permissions[perm as Permission];
  });
};
