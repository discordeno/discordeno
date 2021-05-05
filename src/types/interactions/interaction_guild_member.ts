import { GuildMember } from "../members/guild_member.ts";

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export interface InteractionGuildMember extends GuildMember {
  /** Total permissions of the member in the channel, including overrides, returned when in the interaction object */
  permissions: string;
}
