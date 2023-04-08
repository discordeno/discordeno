import { BitwisePermissionFlags } from '@discordeno/types'
import { ToggleBitfieldBigint } from './ToggleBitfield.js'

export class Permissions extends ToggleBitfieldBigint {
  constructor(bits: string | bigint) {
    super(BigInt(bits))
  }

  has(permission: keyof typeof BitwisePermissionFlags): boolean {
    return this.contains(BigInt(BitwisePermissionFlags[permission]))
  }

  hasAll(permissions: Array<keyof typeof BitwisePermissionFlags>): boolean {
    return permissions.every((key) => this.has(key))
  }

  missing(permissions: Array<keyof typeof BitwisePermissionFlags>): Array<keyof typeof BitwisePermissionFlags> {
    return permissions.filter((key) => !this.has(key))
  }
}
