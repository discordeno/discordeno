import { GuildMemberWithUser } from "../members/guildMember.ts";

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export interface GuildMemberAdd extends GuildMemberWithUser {
  /** id of the guild */
  guildId: string;
}
