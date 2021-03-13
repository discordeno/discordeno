import { RequestManager } from "../../rest/request_manager.ts";
import { structures } from "../../structures/mod.ts";
import { CreateGuildPayload, CreateServerOptions } from "../../types/mod.ts";
import { endpoints } from "../../util/constants.ts";

/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
export async function createGuild(options: CreateServerOptions) {
  const guild = (await RequestManager.post(
    endpoints.GUILDS,
    options,
  )) as CreateGuildPayload;

  return structures.createGuildStruct(guild, 0);
}
