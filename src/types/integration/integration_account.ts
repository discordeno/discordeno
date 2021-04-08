export interface IntegrationAccount {
  /** Id of the account */
  id: string;
  /** Name of the account */
  name: string;
}

/** https://discord.com/developers/docs/resources/guild#integration-account-object-integration-account-structure */
export type DiscordIntegrationAccount = IntegrationAccount;
