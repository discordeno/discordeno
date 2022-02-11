/** https://discord.com/developers/docs/resources/guild#update-user-voice-state */
export interface UpdateOthersVoiceState {
  /** The id of the channel the user is currently in */
  channelId: bigint;
  /** Toggles the user's suppress state */
  suppress?: boolean;
  /** The user id to target */
  userId: bigint;
}
