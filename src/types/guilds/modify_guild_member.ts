import { SnakeCaseProps } from "../util.ts";

export interface ModifyGuildMember {
  /** Value to set users nickname to. Requires the MANAGENICKNAMES permission */
  nick?: string | null;
  /** Array of role ids the member is assigned. Requires the MANAGEROLES permission */
  roles?: string[] | null;
  /** Whether the user is muted in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the MUTEMEMBERS permission */
  mute?: boolean | null;
  /** Whether the user is deafened in voice channels. Will throw a 400 if the user is not in a voice channel. Requires the MOVEMEMBERS permission */
  deaf?: boolean | null;
  /** Id of channel to move user to (if they are connected to voice). Requires the MOVEMEMBERS permission */
  channelId: string | null;
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-member */
export type DiscordModifyGuildMember = SnakeCaseProps<ModifyGuildMember>;
