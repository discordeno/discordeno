/** https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice */
export interface ApplicationCommandOptionChoice {
  /** 1-100 character choice name */
  name: string;
  /** Value of the choice, up to 100 characters if string */
  value: string | number;
}
