import { memberToggles } from "../../../structures/member.ts";
import { BitField } from "./BitField.ts";

export class MemberBitField extends BitField {
  constructor(bits: bigint) {
    super(bits);
  }

  /** Whether the user belongs to an OAuth2 application */
  get bot() {
    return this.has(memberToggles.bot);
  }

  /** Sets whether the user belongs to an OAuth2 application */
  set bot(value: boolean) {
    this.set(memberToggles.bot, value);
  }

  /** Whether the user is an Official Discord System user (part of the urgent message system) */
  get system() {
    return this.has(memberToggles.system);
  }

  /** Sets whether the user is an Official Discord System user (part of the urgent message system) */
  set system(value: boolean) {
    this.set(memberToggles.system, value);
  }

  /** Whether the user has two factor enabled on their account */
  get mfaEnabled() {
    return this.has(memberToggles.mfaEnabled);
  }

  /** Sets whether the user has two factor enabled on their account */
  set mfaEnabled(value: boolean) {
    this.set(memberToggles.mfaEnabled, value);
  }

  /** Whether the email on this account has been verified */
  get verified() {
    return this.has(memberToggles.verified);
  }

  /** Sets whether the email on this account has been verified */
  set verified(value: boolean) {
    this.set(memberToggles.verified, value);
  }

  /** Whether the users avatar is animated. */
  get animatedAvatar() {
    return this.has(memberToggles.animatedAvatar);
  }

  /** Sets whether the users avatar is animated. */
  set animatedAvatar(value: boolean) {
    this.set(memberToggles.animatedAvatar, value);
  }
}

export default MemberBitField;
