/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BitwisePermissionFlags } from '@discordeno/types'
import { Base } from '../Base.js'
import type { BigString } from '../Client.js'
import type { PermissionClientStrings } from '../Constants.js'
import { Permissions } from '../Constants.js'

export class Permission {
  allow: bigint
  deny: bigint
  _json?: Record<string, boolean>

  constructor(allow: BigString | number = 0, deny: BigString | number = 0) {
    this.allow = BigInt(allow)
    this.deny = BigInt(deny)
  }

  get isAdmin(): boolean {
    return !!(this.allow & BigInt(BitwisePermissionFlags.ADMINISTRATOR))
  }

  get json() {
    if (!this._json) {
      this._json = {}
      for (const key of Object.keys(BitwisePermissionFlags)) {
        if (typeof key === 'number') continue

        const perm = key as keyof typeof BitwisePermissionFlags

        if (this.allow & BigInt(BitwisePermissionFlags[perm])) {
          this._json[perm] = true
        } else if (this.deny & BigInt(BitwisePermissionFlags[perm])) {
          this._json[perm] = false
        }
      }
    }
    return this._json
  }

  /** Check if this permission allows a specific permission */
  has(permission: bigint | PermissionClientStrings): boolean {
    if (this.isAdmin) return true

    if (typeof permission === 'bigint') {
      return (this.allow & permission) === permission
    }
    return !!(this.allow & Permissions[permission])
  }

  toString() {
    return `[${this.constructor.name} +${this.allow} -${this.deny}]`
  }

  toJSON(props: string[] = []): Record<string, any> {
    return Base.prototype.toJSON.call(['allow', 'deny', ...props])
  }
}

export default Permission
