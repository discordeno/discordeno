import { applicationId } from "../../bot.ts";
import { cache } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";

/**
 * Send a response to a users slash command. The command data will have the id and token necessary to respond.
 * Interaction `tokens` are valid for **15 minutes** and can be used to send followup messages.
 *
 * NOTE: By default we will suppress mentions. To enable mentions, just pass any mentions object.
 */
export async function sendInteractionResponse(
  id: string,
  token: string,
  options: SlashCommandResponseOptions,
) {
  // If its already been executed, we need to send a followup response
  if (cache.executedSlashCommands.has(token)) {
    return RequestManager.post(endpoints.WEBHOOK(applicationId, token), {
      ...options,
    });
  }

  // Expire in 15 minutes
  cache.executedSlashCommands.set(token, id);
  setTimeout(
    () => cache.executedSlashCommands.delete(token),
    900000,
  );

  // If the user wants this as a private message mark it ephemeral
  if (options.private) {
    options.data.flags = 64;
  }

  // If no mentions are provided, force disable mentions
  if (!options.data.allowed_mentions) {
    options.data.allowed_mentions = { parse: [] };
  }

  const result = await RequestManager.post(
    endpoints.INTERACTION_Id_TOKEN(id, token),
    options,
  );

  return result;
}
