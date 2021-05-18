import { BitField } from "./BitField.ts";

export class RoleBitField extends BitField {
  /** If this role is showed seperately in the user listing */
  hoist = 1n;
  /** Whether this role is managed by an integration */
  managed = 2n;
  /** Whether this role is mentionable */
  mentionable = 4n;
  /** If this role is the nitro boost role. */
  isNitroBoost = 8n;

  constructor(bits: bigint) {
    super(bits);
  }

  /** Whether or not this role is hoisted. */
  get hoisted() {
    return this.has(this.hoist);
  }

  /** Whether or not the role is managed by everyone. */
  get managedRole() {
    return this.has(this.managed);
  }

  /** Change whether or not the role is mentionable. */
  get mentionableRole() {
    return this.has(this.mentionable);
  }

  /** Whether or not the role is the nitro booster role in this server. */
  get isNitroBoostRole() {
    return this.has(this.isNitroBoost);
  }
}

export default RoleBitField;
