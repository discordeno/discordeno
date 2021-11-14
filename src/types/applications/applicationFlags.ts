/** https://discord.com/developers/docs/topics/oauth2#application-application-flags */
export enum DiscordApplicationFlags {
  GatewayPresence = 1 << 12,
  GatewayPresenceLimited = 1 << 13,
  GatewayGuildMembers = 1 << 14,
  GatewayGuildMembersLimited = 1 << 15,
  VerificationPendingGuildLimit = 1 << 16,
  Embedded = 1 << 17,
  GatewayMessageCount = 1 << 18,
  GatewayMessageContentLimited = 1 << 19,
}

export type ApplicationFlags = DiscordApplicationFlags;
export const ApplicationFlags = DiscordApplicationFlags;
