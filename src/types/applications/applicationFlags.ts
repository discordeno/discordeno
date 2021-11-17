/** https://discord.com/developers/docs/topics/oauth2#application-application-flags */
export enum ApplicationFlags {
  GatewayPresence = 1 << 12,
  GatewayPresenceLimited = 1 << 13,
  GatewayGuildMembers = 1 << 14,
  GatewayGuildMembersLimited = 1 << 15,
  VerificationPendingGuildLimit = 1 << 16,
  Embedded = 1 << 17,
  GatewayMessageCount = 1 << 18,
  GatewayMessageContentLimited = 1 << 19,
}
