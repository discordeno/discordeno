import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface ModifyGuildIntegration {
  /** The behavior when an integration subscription lapses (see the [integration expire behaviors](https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors) documentation) */
  expireBehavior?: number | null;
  /** Period (in days) where the integration will ignore lapsed subscriptions */
  expireGracePeriod?: number | null;
  /** Whether emoticons should be synced for this integration (twitch only currently) */
  enableEmoticonns?: boolean | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-integration-json-params */
export type DiscordModifyGuildIntegration = SnakeCasedPropertiesDeep<
  ModifyGuildIntegration
>;
