import { Guild } from "./guild.ts";
import { User } from "./user.ts";

/** https://discord.com/developers/docs/resources/template#template-resource */
export interface Template {
  /** the template code (unique ID) */
  code: string;
  /** template name */
  name: string;
  /** the description for the template */
  description: string | null;
  /** number of times this template has been used */
  usageCount: number;
  /** the ID of teh user who created the template */
  creatorID: string;
  /** the user who created the template */
  creator: User;
  /** when this template was created*/
  createdAt: string;
  /** when this template was last synced to the source guild */
  updatedAt: string;
  /** the ID of the guild this template is based on */
  sourceGuildID: string;
  /** the guild snapshot this template contains */
  serializedSourceGuild: Partial<Guild>;
  /** whether the template has unsynced changes */
  isDirty: boolean | null;
}

/** https://discord.com/developers/docs/resources/template#create-guild-from-template */
export interface CreateGuildFromTemplateOptions {
  /** name of the guild (2-100 characters) */
  name: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
}

/** https://discord.com/developers/docs/resources/template#create-guild-template */
export interface CreateGuildTemplateOptions {
  /** name of the template (1-100 characters) */
  name: string;
  /** description for the template (0-120 characters) */
  description?: string | null;
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplateOptions {
  /** name of the template (1-100 characters) */
  name?: string;
  /** description for the template (0-120 characters) */
  description?: string | null;
}
