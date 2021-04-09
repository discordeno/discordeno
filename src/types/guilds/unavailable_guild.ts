import { SnakeCasedPropertiesDeep } from "../util.ts";
import { Guild } from "./guild.ts";

export type UnavailableGuild = Pick<Guild, "id" | "unavailable">;

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export type DiscordUnavailableGuild = SnakeCasedPropertiesDeep<
  UnavailableGuild
>;
