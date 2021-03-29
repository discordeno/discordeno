import { SnakeCaseProps } from "../util.ts";

export type UnavailableGuild = Pick<Guild, "id" | "unavailable">;

/** https://discord.com/developers/docs/resources/guild#unavailable-guild-object */
export type DiscordUnavailableGuild = SnakeCaseProps<UnavailableGuild>;
