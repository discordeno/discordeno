import { DiscordBaseMember } from "./base.ts";
import { DiscordUser } from "./user/user.ts";

/** https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure */
export interface DiscordMember extends DiscordBaseMember {
  /** the user this guild member represents */
  user?: DiscordUser;
}
