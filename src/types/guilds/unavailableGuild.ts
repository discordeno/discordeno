import { Guild } from "./guild.ts";

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export type UnavailableGuild = Pick<Guild, "id" | "unavailable">;
