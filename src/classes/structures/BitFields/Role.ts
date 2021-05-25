import { roleToggles } from "../../../structures/role.ts";
import { BitField } from "./BitField.ts";

export class RoleBitField extends BitField {
  constructor(bits: bigint) {
    super(bits);
  }

  /** Whether or not this role is hoisted. */
  get hoist() {
    return this.has(roleToggles.hoist);
  }

  /** Whether or not the role is managed by everyone. */
  get managed() {
    return this.has(roleToggles.managed);
  }

  /** Change whether or not the role is mentionable. */
  get mentionable() {
    return this.has(roleToggles.mentionable);
  }

  /** Whether or not the role is the nitro booster role in this server. */
  get isNitroBoost() {
    return this.has(roleToggles.isNitroBoostRole);
  }
}

export default RoleBitField;
