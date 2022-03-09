import { DiscordUser } from "../discord.ts";
import { IntegrationAccount } from "./integrationAccount.ts";
import { IntegrationApplication } from "./integrationApplication.ts";
import { IntegrationExpireBehaviors } from "./integrationExpireBehaviors.ts";

/** https://discord.com/developers/docs/resources/guild#integration-object-integration-structure */
export interface Integration {
  /** Integration Id */
  id: string;
  /** Integration name */
  name: string;
  /** Integration type (twitch, youtube or discord) */
  type: "twitch" | "youtube" | "discord";
  /** Is this integration enabled */
  enabled: boolean;
  /** Is this integration syncing */
  syncing?: boolean;
  /** Role Id that this integration uses for "subscribers" */
  roleId?: string;
  /** Whether emoticons should be synced for this integration (twitch only currently) */
  enableEmoticons?: boolean;
  /** The behavior of expiring subscribers */
  expireBehavior?: IntegrationExpireBehaviors;
  /** The grace period (in days) before expiring subscribers */
  expireGracePeriod?: number;
  /** User for this integration */
  user?: DiscordUser;
  /** Integration account information */
  account: IntegrationAccount;
  /** When this integration was last synced */
  syncedAt?: string;
  /** How many subscribers this integration has */
  subscriberCount?: number;
  /** Has this integration been revoked */
  revoked?: boolean;
  /** The bot/OAuth2 application for discord integrations */
  application?: IntegrationApplication;
}
