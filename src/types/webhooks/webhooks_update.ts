import { SnakeCaseProps } from "../util.ts";

export interface WebhooksUpdate {
  /** id of the guild */
  guildId: string;
  /** id of the channel */
  channelId: string;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update */
export type DiscordWebhooksUpdate = SnakeCaseProps<WebhooksUpdate>;
