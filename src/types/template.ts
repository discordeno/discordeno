import { GuildPayload } from "./guild.ts";
import { UserPayload } from "./user.ts";

/** https://discord.com/developers/docs/resources/template#template-resource */
export interface TemplatePayload {
  /** the template code (unique ID) */
  code: string;
  /** template name */
  name: string;
  /** the description for the template */
  description: string | null;
  /** number of times this template has been used */
  usage_count: number;
  /** the ID of teh user who created the template */
  creator_id: string;
  /** the user who created the template */
  creator: UserPayload;
  /** when this template was created*/
  created_at: string;
  /** when this template was last synced to the source guild */
  source_guild_id: string;
  /** the guild snapshot this template contains */
  serialized_source_guild: Partial<GuildPayload>;
  /** whether the template has unsynced changes */
  is_dirty: boolean | null;
}

/** https://discord.com/developers/docs/resources/template#create-guild-from-template */
export interface CreateGuildFromTemplateParams {
  /** name of the guild (2-100 characters) */
  name: string;
  /** base64 128x128 image for the guild icon */
  icon?: string;
}

/** https://discord.com/developers/docs/resources/template#create-guild-template */
export interface CreateGuildTemplateParams {
  /** name of the template (1-100 characters) */
  name: string;
  /** description for the template (0-120 characters) */
  description?: string | null;
}

/** https://discord.com/developers/docs/resources/template#modify-guild-template */
export interface ModifyGuildTemplateParams {
  /** name of the template (1-100 characters) */
  name?: string;
  /** description for the template (0-120 characters) */
  description?: string | null;
}
