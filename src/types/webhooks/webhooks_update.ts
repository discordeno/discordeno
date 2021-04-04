import { SnakeCaseProps } from "../util.ts";

export interface WebhookUpdate {
  /** id of the guild */
  guildId: string;
  /** id of the channel */
  channelId: string;
}

/** https://discord.com/developers/docs/topics/gateway#webhooks-update-webhook-update-event-fields */
export type DiscordWebhookUpdate = SnakeCaseProps<WebhookUpdate>;
