export class Bitfield {
  /** The total bits that holds whether something is true or false. */
  bits: bigint;

  constructor(bits: bigint) {
    this.bits = bits;
  }

  /** Check if this field is true or false. */
  has(bits: bigint) {
    return Boolean(this.bits & bits);
  }

  /** Set the value of this field. */
  set(bits: bigint, enabled: boolean) {
    if (enabled) this.add(bits);
    else this.remove(bits);

    return this;
  }

  /** Adds some bits to the bitfield. */
  add(bits: bigint) {
    this.bits |= bits;
    return this;
  }

  /** Removes some bits from the bitfield. */
  remove(bits: bigint) {
    this.bits &= ~bits;
    return this;
  }
}

export default Bitfield;
