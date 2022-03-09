import { Bot } from "../bot.ts";
import { DiscordWebhook } from "../types/discord.ts";
import { Webhook } from "../types/discordeno.ts";
import { WebhookTypes } from "../types/shared.ts";
import { DiscordenoUser } from "./member.ts";

export function transformWebhook(bot: Bot, payload: DiscordWebhook): Webhook {
  return {
    id: bot.transformers.snowflake(payload.id),
    type: payload.type,
    guildId: payload.guild_id ? bot.transformers.snowflake(payload.guild_id) : undefined,
    channelId: payload.channel_id ? bot.transformers.snowflake(payload.channel_id) : undefined,
    user: payload.user ? bot.transformers.user(bot, payload.user) : undefined,
    name: payload.name || "",
    avatar: payload.avatar ? bot.utils.iconHashToBigInt(payload.avatar) : undefined,
    token: payload.token,
    applicationId: payload.application_id ? bot.transformers.snowflake(payload.application_id) : undefined,
    sourceGuild: payload.source_guild
      ? {
        id: bot.transformers.snowflake(payload.source_guild.id!),
        name: payload.source_guild.name!,
        icon: payload.source_guild.icon ? bot.utils.iconHashToBigInt(payload.source_guild.icon) : undefined,
      }
      : undefined,
    /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
    sourceChannel: payload.source_channel
      ? {
        id: bot.transformers.snowflake(payload.source_channel.id!),
        name: payload.source_channel.name || "",
      }
      : undefined,
    /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
    url: payload.url,
  };
}

export interface DiscordenoWebhook {
  /** The id of the webhook */
  id: bigint;
  /** The type of the webhook */
  type: WebhookTypes;
  /** The guild id this webhook is for */
  guildId?: bigint;
  /** The channel id this webhook is for */
  channelId?: bigint;
  /** The user this webhook was created by (not returned when getting a webhook with its token) */
  user?: DiscordenoUser;
  /** The default name of the webhook */
  name?: string;
  /** The default user avatar hash of the webhook */
  avatar?: bigint;
  /** The secure token of the webhook (returned for Incomming Webhooks) */
  token?: string;
  /** The bot/OAuth2 application that created this webhook */
  applicationId?: bigint;
  /** The guild of the channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceGuild?: {
    id: bigint;
    name: string;
    icon?: bigint;
  };
  /** The channel that this webhook is following (returned for Channel Follower Webhooks) */
  sourceChannel?: {
    id: bigint;
    name: string;
  };
  /** The url used for executing the webhook (returned by the webhooks OAuth2 flow) */
  url?: string;
}
