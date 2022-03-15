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
