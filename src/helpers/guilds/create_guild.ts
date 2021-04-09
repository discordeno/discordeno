import { rest } from "../../rest/rest.ts";
import { structures } from "../../structures/mod.ts";
import { CreateGuild } from "../../types/guilds/create_guild.ts";
import { DiscordGuild } from "../../types/guilds/guild.ts";
import { endpoints } from "../../util/constants.ts";

/** Create a new guild. Returns a guild object on success. Fires a Guild Create Gateway event. This endpoint can be used only by bots in less than 10 guilds. */
export async function createGuild(options: CreateGuild) {
  const guild = (await rest.runMethod(
    "post",
    endpoints.GUILDS,
    options,
  )) as DiscordGuild;

  return structures.createDiscordenoGuild(guild, 0);
}
