import { GuildMember } from "../guilds/guild_member.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface GuildMemberAdd extends GuildMember {
  /** id of the guild */
  guildId: string;
}

/** https://discord.com/developers/docs/topics/gateway#guild-member-add */
export type DiscordGuildMemberAdd = SnakeCasedPropertiesDeep<GuildMemberAdd>;
