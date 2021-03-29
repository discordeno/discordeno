import { SnakeCaseProps } from "../util.ts";

export interface AddGuildMemberParams {
  /** An oauth2 access token granted with the guilds.join to the bot's application for the user you want to add to the guild */
  accessToken: string;
  /** Value to set users nickname to. Requires the MANAGENICKNAMES permission */
  nick?: string;
  /** Array of role ids the member is assigned. Requires the MANAGEROLES permission */
  roles?: string[];
  /** Whether the user is muted in voice channels. Requires the MUTEMEMBERS permission */
  mute?: boolean;
  /** Whether the user is deafened in voice channels. Requires the DEAFENMEMBERS permission */
  deaf?: boolean;
}

/** https://discord.com/developers/docs/resources/guild#add-guild-member */
export type DiscordAddGuildMemberParams = SnakeCaseProps<AddGuildMemberParams>;
