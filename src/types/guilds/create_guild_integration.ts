export interface CreateGuildIntegration {
  /** The integration type */
  type: string;
  /** The integration id */
  id: string;
}

/** https://discord.com/developers/docs/resources/guild#create-guild-integration-json-params */
export type DiscordCreateGuildIntegration = CreateGuildIntegration;
