import { SnakeCasedPropertiesDeep } from "../util.ts";
import { Integration } from "./integration.ts";

export interface IntegrationCreateUpdate extends Integration {
  /** Id of the guild */
  guildId: string;
}

/** https://github.com/discord/discord-api-docs/blob/master/docs/topics/Gateway.md#integration-create-event-additional-fields */
export type DiscordIntegrationCreateUpdate = SnakeCasedPropertiesDeep<IntegrationCreateUpdate>;
