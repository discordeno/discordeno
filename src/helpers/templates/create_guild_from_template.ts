import { cacheHandlers } from "../../cache.ts";
import { RequestManager } from "../../rest/request_manager.ts";
import {
  CreateGuildFromTemplate,
  CreateGuildPayload,
} from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";
import { urlToBase64 } from "../../util/utils.ts";

/**
 * Create a new guild based on a template
 * NOTE: This endpoint can be used only by bots in less than 10 guilds.
 */
export async function createGuildFromTemplate(
  templateCode: string,
  data: CreateGuildFromTemplate,
) {
  if ((await cacheHandlers.size("guilds")) >= 10) {
    throw new Error(
      "This function can only be used by bots in less than 10 guilds.",
    );
  }

  if (data.icon) {
    data.icon = await urlToBase64(data.icon);
  }

  const result = await await RequestManager.post(
    endpoints.GUILD_TEMPLATE(templateCode),
    data,
  );

  return result as CreateGuildPayload;
}
