/** https://discord.com/developers/docs/resources/guild#update-current-user-voice-state */
export interface UpdateSelfVoiceState {
  /** The id of the channel the user is currently in */
  channelId: bigint;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** Sets the user's request to speak */
  requestToSpeakTimestamp?: number | null;
}
