export class ToggleBitfield {
  bitfield = 0

  constructor(bitfield?: number) {
    if (bitfield) this.bitfield = bitfield
  }

  /** Tests whether or not this bitfield has the permission requested. */
  contains(bits: number): boolean {
    return Boolean(this.bitfield & bits)
  }

  /** Adds some bits to the bitfield. */
  add(bits: number): this {
    this.bitfield |= bits
    return this
  }

  /** Removes some bits from the bitfield. */
  remove(bits: number): this {
    this.bitfield &= ~bits
    return this
  }

  toJSON(): number {
    return this.bitfield
  }
}

export class ToggleBitfieldBigint {
  bitfield = 0n

  constructor(bitfield?: bigint) {
    if (bitfield) this.bitfield = bitfield
  }

  /** Tests whether or not this bitfield has the permission requested. */
  contains(bits: bigint): boolean {
    return Boolean(this.bitfield & bits)
  }

  /** Adds some bits to the bitfield. */
  add(bits: bigint): this {
    this.bitfield |= bits
    return this
  }

  /** Removes some bits from the bitfield. */
  remove(bits: bigint): this {
    this.bitfield &= ~bits
    return this
  }

  toJSON(): string {
    return this.bitfield.toString()
  }
}
