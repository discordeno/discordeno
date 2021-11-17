import { EditWebhookMessage } from "../webhooks/editWebhookMessage.ts";

export interface DiscordenoEditWebhookMessage extends EditWebhookMessage {
  /** Id of the message you want to edit if undefined the initial response message will be edited */
  messageId?: bigint;
}
