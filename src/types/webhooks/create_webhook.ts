import { SnakeCaseProps } from "../util.ts";

export interface CreateWebhook {
  /** Name of the webhook (1-80 characters) */
  name: string;
  /** Image for the default webhook avatar */
  avatar: string | null;
}

/** https://discord.com/developers/docs/resources/webhook#create-webhook-json-params */
export type DiscordCreateWebhook = SnakeCaseProps<CreateWebhook>;
