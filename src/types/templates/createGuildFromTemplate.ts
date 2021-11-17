/** https://discord.com/developers/docs/resources/template#create-guild-from-template-json-params */
export interface CreateGuildFromTemplate {
  /** Name of the guild (2-100 characters) */
  name: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
}
