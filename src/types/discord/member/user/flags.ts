/** https://discord.com/developers/docs/resources/user#users-resource */
export enum DiscordUserFlags {
  NONE = 0,
  DISCORD_EMPLOYEE = 1 << 0,
  PARTNERED_SERVER_OWNER = 1 << 1,
  HYPE_SQUAD_EVENTS = 1 << 2,
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  HOUSE_BRAVERY = 1 << 6,
  HOUSE_BRILLIANCE = 1 << 7,
  HOUSE_BALANCE = 1 << 8,
  EARLY_SUPPORTER = 1 << 9,
  TEAM_USER = 1 << 10,
  SYSTEM = 1 << 12,
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  VERIFIED_BOT = 1 << 16,
  EARLY_VERIFIED_BOT_DEVELOPER = 1 << 17,
}
