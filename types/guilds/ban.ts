import { DiscordUser } from "../discord.ts";

/** https://discord.com/developers/docs/resources/guild#ban-object */
export interface Ban {
  /** The reason for the ban */
  reason: string | null;
  /** The banned user */
  user: DiscordUser;
}
