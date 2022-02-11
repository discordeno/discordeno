/** https://discord.com/developers/docs/topics/opcodes-and-status-codes#rpc */
export enum RpcErrorCodes {
  /** An unknown error occurred. */
  UnknownError = 1000,
  /** You sent an invalid payload. */
  InvalidPayload = 4000,
  /** Invalid command name specified. */
  InvalidCommand = 4002,
  /** Invalid guild ID specified. */
  InvalidGuild,
  /** Invalid event name specified. */
  InvalidEvent,
  /** Invalid channel ID specified. */
  InvalidChannel,
  /** You lack permissions to access the given resource. */
  InvalidPermissions,
  /** An invalid OAuth2 application ID was used to authorize or authenticate with. */
  InvalidClientId,
  /** An invalid OAuth2 application origin was used to authorize or authenticate with. */
  InvalidOrigin,
  /** An invalid OAuth2 token was used to authorize or authenticate with. */
  InvalidToken,
  /** The specified user ID was invalid. */
  InvalidUser,
  /** A standard OAuth2 error occurred; check the data object for the OAuth2 error details. */
  OAuth2Error = 5000,
  /** An asynchronous `SELECT_TEXT_CHANNEL`/`SELECT_VOICE_CHANNEL` command timed out. */
  SelectChannelTimedOut,
  /** An asynchronous `GET_GUILD` command timed out. */
  GetGuildTimedOut,
  /** You tried to join a user to a voice channel but the user was already in one. */
  SelectVoiceForceRequired,
  /** You tried to capture more than one shortcut key at once. */
  CaptureShortcutAlreadyListening,
}
