/** https://discord.com/developers/docs/resources/user#user-object-user-flags */
export enum UserFlags {
  None,
  DiscordEmployee = 1 << 0,
  ParteneredServerOwner = 1 << 1,
  HypeSquadEvents = 1 << 2,
  BugHunterLevel1 = 1 << 3,
  HouseBravery = 1 << 6,
  HouseBrilliance = 1 << 7,
  HouseBalance = 1 << 8,
  EarlySupporter = 1 << 9,
  TeamUser = 1 << 10,
  BugHunterLevel2 = 1 << 14,
  VerifiedBot = 1 << 16,
  EarlyVerifiedBotDeveloper = 1 << 17,
  DiscordCertifiedModerator = 1 << 18,
  BotHttpInteractions = 1 << 19,
}
