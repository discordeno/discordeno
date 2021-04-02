import { applicationId } from "../../bot.ts";
import { rest } from "../../rest/rest.ts";
import { endpoints } from "../../util/constants.ts";

/** To delete your response to a slash command. If a message id is not provided, it will default to deleting the original response. */
export async function deleteSlashResponse(token: string, messageId?: string) {
  const result = await rest.runMethod(
    "delete",
    messageId
      ? endpoints.INTERACTION_ID_TOKEN_MESSAGE_ID(
        applicationId,
        token,
        messageId,
      )
      : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(applicationId, token),
  );

  return result;
}
