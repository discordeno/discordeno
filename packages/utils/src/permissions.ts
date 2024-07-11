import type { PermissionStrings } from '@discordeno/types'
import { BitwisePermissionFlags } from '@discordeno/types'

/** This function converts a bitwise string to permission strings */
export function calculatePermissions(permissionBits: bigint): PermissionStrings[] {
  return Object.keys(BitwisePermissionFlags).filter((permission) => {
    // Since Object.keys() not only returns the permission names but also the bit values we need to return false if it is a Number
    if (Number(permission)) return false
    // Check if permissionBits has this permission
    return permissionBits & BitwisePermissionFlags[permission as PermissionStrings]
  }) as PermissionStrings[]
}

/** This function converts an array of permissions into the bitwise string. */
export function calculateBits(permissions: PermissionStrings[]): string {
  return permissions
    .reduce((bits, perm) => {
      bits |= BitwisePermissionFlags[perm]
      return bits
    }, 0n)
    .toString()
}
