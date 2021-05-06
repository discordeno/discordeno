import { GuildMemberWithUser } from "../members/guild_member.ts";

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface InteractionGuildMember extends GuildMemberWithUser {
  /** Total permissions of the member in the channel, including overrides, returned when in the interaction object */
  permissions: string;
}
