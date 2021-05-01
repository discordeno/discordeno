/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype */
export enum DiscordApplicationCommandOptionTypes {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP,
  STRING,
  INTEGER,
  BOOLEAN,
  USER,
  CHANNEL,
  ROLE,
  MENTIONABLE,
}

export type ApplicationCommandOptionTypes =
  DiscordApplicationCommandOptionTypes;
export const ApplicationCommandOptionTypes =
  DiscordApplicationCommandOptionTypes;
