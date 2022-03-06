import { Bot } from "../bot.ts";
import { IntegrationCreateUpdate } from "../types/integrations/integrationCreateUpdate.ts";
import { IntegrationExpireBehaviors } from "../types/integrations/integrationExpireBehaviors.ts";
import { SnakeCasedPropertiesDeep } from "../types/util.ts";
import { DiscordenoUser } from "./member.ts";

export function transformIntegration(bot: Bot, payload: SnakeCasedPropertiesDeep<IntegrationCreateUpdate>) {
  return {
    guildId: bot.transformers.snowflake(payload.guild_id),
    id: bot.transformers.snowflake(payload.id),
    name: payload.name,
    type: payload.type,
    enabled: payload.enabled,
    syncing: payload.syncing,
    roleId: payload.role_id ? bot.transformers.snowflake(payload.role_id) : undefined,
    enableEmoticons: payload.enable_emoticons,
    expireBehavior: payload.expire_behavior,
    expireGracePeriod: payload.expire_grace_period,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    account: {
      id: bot.transformers.snowflake(payload.account.id),
      name: payload.account.name,
    },
    syncedAt: payload.synced_at ? Date.parse(payload.synced_at) : undefined,
    subscriberCount: payload.subscriber_count,
    revoked: payload.revoked,
    application: payload.application
      ? {
        id: bot.transformers.snowflake(payload.application.id),
        name: payload.application.name,
        icon: payload.application.icon ? bot.utils.iconHashToBigInt(payload.application.icon) : undefined,
        description: payload.application.description,
        summary: payload.application.summary,
        bot: payload.application.bot ? bot.transformers.user(bot, payload.application.bot) : undefined,
      }
      : undefined,
  };
}

export interface DiscordenoIntegration {
  /** The guild id for where this integration is location. */
  guildId: bigint;
  /** Integration Id */
  id: bigint;
  /** Integration name */
  name: string;
  /** Integration type (twitch, youtube or discord) */
  type: "twitch" | "youtube" | "discord";
  /** Is this integration enabled */
  enabled: boolean;
  /** Is this integration syncing */
  syncing?: boolean;
  /** Role Id that this integration uses for "subscribers" */
  roleId?: bigint;
  /** Whether emoticons should be synced for this integration (twitch only currently) */
  enableEmoticons?: boolean;
  /** The behavior of expiring subscribers */
  expireBehavior?: IntegrationExpireBehaviors;
  /** The grace period (in days) before expiring subscribers */
  expireGracePeriod?: number;
  /** User for this integration */
  user?: DiscordenoUser;
  /** Integration account information */
  account: {
    /** Id of the account */
    id: bigint;
    /** Name of the account */
    name: string;
  };
  /** When this integration was last synced */
  syncedAt?: number;
  /** How many subscribers this integration has */
  subscriberCount?: number;
  /** Has this integration been revoked */
  revoked?: boolean;
  /** The bot/OAuth2 application for discord integrations */
  application?: {
    /** The id of the app */
    id: bigint;
    /** The name of the app */
    name: string;
    /** the icon hash of the app */
    icon?: bigint;
    /** The description of the app */
    description: string;
    /** The summary of the app */
    summary: string;
    /** The bot associated with this application */
    bot?: DiscordenoUser;
  };
}
