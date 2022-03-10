import { DiscordGuild, DiscordUser } from "../discord.ts";

/** https://discord.com/developers/docs/resources/template#template-object-template-structure */
export interface Template {
  /** The template code (unique Id) */
  code: string;
  /** Template name */
  name: string;
  /** The description for the template */
  description: string | null;
  /** Number of times this template has been used */
  usageCount: number;
  /** The Id of the user who created the template */
  creatorId: string;
  /** The user who created the template */
  creator: DiscordUser;
  /** When this template was created */
  createdAt: string;
  /** When this template was last synced to the source guild */
  updatedAt: string;
  /** The Id of the guild this template is based on */
  sourceGuildId: string;
  /** The guild snapshot this template contains */
  serializedSourceGuild: Partial<DiscordGuild>;
  /** Whether the template has unsynced changes */
  isDirty: boolean | null;
}
