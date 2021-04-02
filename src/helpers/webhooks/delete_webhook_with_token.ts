import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** Delete a webhook permanently. Returns a undefined on success */
export async function deleteWebhookWithToken(
  webhookId: string,
  webhookToken: string,
) {
  const result = await rest.runMethod(
    "delete",
    endpoints.WEBHOOK(webhookId, webhookToken),
  );

  return result;
}
