/** https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors */
export enum DiscordIntegrationExpireBehaviors {
  RemoveRole,
  Kick,
}

export type IntegrationExpireBehaviors = DiscordIntegrationExpireBehaviors;
export const IntegrationExpireBehaviors = DiscordIntegrationExpireBehaviors;
