/** https://discord.com/developers/docs/resources/guild#guild-object-verification-level */
export enum VerificationLevel {
  /** Unrestricted */
  NONE,
  /** Must have verified email on account */
  LOW,
  /** Must be registered on Discord for longer than 5 minutes */
  MEDIUM,
  /** Must be a member of the server for longer than 10 minutes */
  HIGH,
  /** Must have a verified phone number */
  VERY_HIGH,
}
