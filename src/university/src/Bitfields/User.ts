import Bitfield from "./Bitfield.ts";

export const USER_TOGGLES = {
  /** Whether this user's avatar is animated. */
  animated: 1n,
};

export class UserBitfield extends Bitfield {
  constructor(bits = 0n) {
    super(bits);
  }

  /** Whether this user's avatar is animated */
  get animated() {
    return this.has(USER_TOGGLES.animated);
  }

  /** Change whether this user's avatar is animated */
  set animated(value: boolean) {
    this.set(USER_TOGGLES.animated, value);
  }
}

export default UserBitfield;
