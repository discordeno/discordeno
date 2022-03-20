import { BitwisePermissionFlags, PermissionStrings } from "../types/shared.ts";

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint) {
  return Object.keys(BitwisePermissionFlags).filter((permission) => {
    // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
    if (Number(permission)) return false;
    // Check if permissionBits has this permission
    return permissionBits & BigInt(BitwisePermissionFlags[permission as PermissionStrings]);
  }) as PermissionStrings[];
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: PermissionStrings[]) {
  return permissions
    .reduce((bits, perm) => {
      bits |= BigInt(BitwisePermissionFlags[perm]);
      return bits;
    }, 0n)
    .toString();
}
