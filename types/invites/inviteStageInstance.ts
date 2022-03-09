import { DiscordMember } from "../discord.ts";

export interface InviteStageInstance {
  /** The members speaking in the Stage */
  members: Partial<DiscordMember>[];
  /** The number of users in the Stage */
  participantCount: number;
  /** The number of users speaking in the Stage */
  speakerCount: number;
  /** The topic of the Stage instance (1-120 characters) */
  topic: string;
}
