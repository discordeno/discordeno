/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
export enum DiscordApplicationCommandOptionTypes {
  SubCommand = 1,
  SubCommandGroup,
  String,
  Integer,
  Boolean,
  User,
  Channel,
  Role,
  Mentionable,
  Number,
}

export type ApplicationCommandOptionTypes = DiscordApplicationCommandOptionTypes;
export const ApplicationCommandOptionTypes = DiscordApplicationCommandOptionTypes;
