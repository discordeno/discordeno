/** https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-delete-event-fields */
export interface IntegrationDelete {
  /** Integration id */
  id: string;
  /** Id of the guild */
  guildId: string;
  /** Id of the bot/OAuth2 application for this discord integration */
  applicationId?: string;
}
