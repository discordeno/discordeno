import { DiscordGuild } from "../discord.ts";

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export type UnavailableGuild = Pick<DiscordGuild, "id" | "unavailable">;
