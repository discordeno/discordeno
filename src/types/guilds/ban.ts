import { User } from "../users/user.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface Ban {
  /** The reason for the ban */
  reason: string | null;
  /** The banned user */
  user: User;
}

/** https://discord.com/developers/docs/resources/guild#ban-object */
export type DiscordBan = SnakeCasedPropertiesDeep<Ban>;
