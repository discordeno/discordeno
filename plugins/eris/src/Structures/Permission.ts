import { BitwisePermissionFlags } from "../../deps.ts";
import { Base } from "../Base.ts";
import { BigString } from "../Client.ts";

export class Permission {
  allow: bigint;
  deny: bigint;
  _json?: Record<string, boolean>;

  constructor(allow: BigString | number, deny: BigString | number = 0) {
    this.allow = BigInt(allow);
    this.deny = BigInt(deny);
  }

  get json() {
    if (!this._json) {
      this._json = {};
      for (const key of Object.keys(BitwisePermissionFlags)) {
        if (typeof key === "number") continue;

        const perm = key as keyof typeof BitwisePermissionFlags;

        if (this.allow & BigInt(BitwisePermissionFlags[perm])) {
          this._json[perm] = true;
        } else if (this.deny & BigInt(BitwisePermissionFlags[perm])) {
          this._json[perm] = false;
        }
      }
    }
    return this._json;
  }

  /** Check if this permission allows a specific permission */
  has(permission: bigint | keyof typeof BitwisePermissionFlags): boolean {
    if (typeof permission === "bigint") {
      return (this.allow & permission) === permission;
    }
    return !!(this.allow & BigInt(BitwisePermissionFlags[permission]));
  }

  toString() {
    return `[${this.constructor.name} +${this.allow} -${this.deny}]`;
  }

  toJSON(props: string[] = []) {
    return Base.prototype.toJSON.call([
      "allow",
      "deny",
      ...props,
    ]);
  }
}

export default Permission;
