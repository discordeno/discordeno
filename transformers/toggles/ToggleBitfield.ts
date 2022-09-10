import { BigString } from "../../types/shared.ts";

export class ToggleBitfield {
  bitfield = 0;

  constructor(bitfield?: number) {
    if (bitfield) this.bitfield = bitfield;
  }

  /** Tests whether or not this bitfield has the permission requested. */
  contains(bits: number) {
    return Boolean(this.bitfield & bits);
  }

  /** Adds some bits to the bitfield. */
  add(bits: number) {
    this.bitfield |= bits;
    return this;
  }

  /** Removes some bits from the bitfield. */
  remove(bits: number) {
    this.bitfield &= ~bits;
    return this;
  }
}

export class ToggleBitfieldBigint {
  bitfield = 0n;

  constructor(bitfield?: BigString) {
    if (bitfield) this.bitfield = BigInt(bitfield);
  }

  /** Tests whether or not this bitfield has the permission requested. */
  contains(bits: BigString) {
    return Boolean(this.bitfield & BigInt(bits));
  }

  /** Adds some bits to the bitfield. */
  add(bits: BigString) {
    this.bitfield |= BigInt(bits);
    return this;
  }

  /** Removes some bits from the bitfield. */
  remove(bits: BigString) {
    this.bitfield &= ~BigInt(bits);
    return this;
  }
}
