import { GuildMemberWithUser } from "../members/guild_member.ts";

/** https://discord.com/developers/docs/resources/voice#voice-state-object-voice-state-structure */
export interface VoiceState {
  /** The guild id this voice state is for */
  guildId?: string;
  /** The channel id this user is connected to */
  channelId: string | null;
  /** The user id this voice state is for */
  userId: string;
  /** The guild member this voice state is for, or `null` if the user is in a live stage but not in the guild */
  member?: GuildMemberWithUser | null;
  /** The session id for this voice state */
  sessionId: string;
  /** Whether this user is deafened by the server */
  deaf: boolean;
  /** Whether this user is muted by the server */
  mute: boolean;
  /** Whether this user is locally deafened */
  selfDeaf: boolean;
  /** Whether this user is locally muted */
  selfMute: boolean;
  /** Whether this user is streaming using "Go Live" */
  selfStream?: boolean;
  /** Whether this user's camera is enabled */
  selfVideo: boolean;
  /** Whether this user is muted by the current user */
  suppress: boolean;
  /** The time at which the user requested to speak */
  requestToSpeakTimestamp: string | null;
}
