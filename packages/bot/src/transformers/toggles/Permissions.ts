import { BitwisePermissionFlags, type PermissionStrings } from '@discordeno/types'
import { ToggleBitfieldBigint } from './ToggleBitfield.js'

export class Permissions extends ToggleBitfieldBigint {
  constructor(bits: string | bigint) {
    super(BigInt(bits))
  }

  has(permission: PermissionStrings): boolean {
    return this.contains(BitwisePermissionFlags[permission])
  }

  hasAll(permissions: PermissionStrings[]): boolean {
    return permissions.every((key) => this.has(key))
  }

  missing(permissions: PermissionStrings[]): PermissionStrings[] {
    return permissions.filter((key) => !this.has(key))
  }
}
