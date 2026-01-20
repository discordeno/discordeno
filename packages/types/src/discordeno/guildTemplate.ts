/** Types for: https://discord.com/developers/docs/resources/guild-template */

/** https://discord.com/developers/docs/resources/guild-template#create-guild-template-json-params */
export interface CreateTemplate {
  /** Name which the template should have */
  name: string;
  /** Description of the template */
  description?: string | null;
}

/** https://discord.com/developers/docs/resources/guild-template#modify-guild-template-json-params */
export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string;
  /** Description of the template (0-120 characters) */
  description?: string | null;
}
