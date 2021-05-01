/** https://discord.com/developers/docs/topics/gateway#update-voice-state */
export interface UpdateVoiceState {
  /** id of the guild */
  guildId: string;
  /** id of the voice channel client wants to join (null if disconnecting) */
  channelId: string | null;
  /** Is the client muted */
  selfMute: boolean;
  /** Is the client deafened */
  selfDeaf: boolean;
}
