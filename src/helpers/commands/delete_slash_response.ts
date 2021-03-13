import { applicationID } from "../../bot.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/** To delete your response to a slash command. If a message id is not provided, it will default to deleting the original response. */
export async function deleteSlashResponse(token: string, messageID?: string) {
  const result = await RequestManager.delete(
    messageID
      ? endpoints.INTERACTION_ID_TOKEN_MESSAGEID(
        applicationID,
        token,
        messageID,
      )
      : endpoints.INTERACTION_ORIGINAL_ID_TOKEN(applicationID, token),
  );

  return result;
}
