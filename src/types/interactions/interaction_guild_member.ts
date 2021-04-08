import { GuildMember } from "../guilds/guild_member.ts";
import { SnakeCasedPropertiesDeep } from "../util.ts";

export interface InteractionGuildMember extends GuildMember {
  /** Total permissions of the member in the channel, including overrides, returned when in the interaction object */
  permissions: string;
}

/** https://discord.com/developers/docs/resources/guild#guild-member-object */
export type DiscordInteractionGuildMember = SnakeCasedPropertiesDeep<InteractionGuildMember>;
