import { RequestManager } from "../../rest/request_manager.ts";
import { endpoints } from "../../util/constants.ts";
import { requireBotGuildPermissions } from "../../util/permissions.ts";
import { camelKeysToSnakeCase, urlToBase64 } from "../../util/utils.ts";

/** Check how many members would be removed from the server in a prune operation. Requires the KICK_MEMBERS permission */
export async function getPruneCount(guildID: string, options?: PruneOptions) {
  if (options?.days && options.days < 1) throw new Error(Errors.PRUNE_MIN_DAYS);
  if (options?.days && options.days > 30) {
    throw new Error(Errors.PRUNE_MAX_DAYS);
  }

  await requireBotGuildPermissions(guildID, ["KICK_MEMBERS"]);

  const result = await RequestManager.get(
    endpoints.GUILD_PRUNE(guildID),
    camelKeysToSnakeCase(options ?? {}),
  ) as PrunePayload;

  return result.pruned;
}
