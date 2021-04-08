import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildIntegrationsUpdate {
  /** id of the guild whose integrations were updated */
  guildId: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-integrations-update */
export type DiscordGuildIntegrationsUpdate = SnakeCasedPropertiesDeep<GuildIntegrationsUpdate>;
