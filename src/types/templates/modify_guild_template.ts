export interface ModifyGuildTemplate {
  /** Name of the template (1-100 characters) */
  name?: string;
  /** Description of the template (0-120 characters) */
  description?: string | null;
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export type DiscordModifyGuildTemplate = ModifyGuildTemplate;
